import { getConfig } from "./config";

enum RouterNameModuleControlPanel {
  cp = "cp",
  controlpanel = "controlpanel",
  controlPanel = "controlPanel",
  "control-panel" = "control-panel",
}

enum RouterNameModuleFront {
  front = "front",
}

type RouterName<
  NamePrefix extends string,
  Name extends string
> = `${NamePrefix}.${Name}`;

type RouteData = {
  path: `/${string}`;
  prefix?: string;
};

export type RouteConfig = {
  [key: string]: RouteData;
};

type RouterModuleData = {
  prefix: `/${string}`;
  routes: RouteConfig;
};

export type RouterConfig = {
  controlPanel: RouterModuleData;

  front: RouterModuleData;
};

// Generate link

// Route name parameter type
type NameParameter = RouterName<
  `${RouterNameModuleControlPanel}` | `${RouterNameModuleFront}`,
  string
>;

type ParamsParameter = { [key: string]: string | number | undefined };

const routerConfig = getConfig<RouterConfig, RouterConfig>("app.router");

const segmentFormatRegex = new RegExp(
  [
    "(?!^\\[[^\\[\\]]+?\\]{2}|\\[{2}[^\\[\\]]+?\\]$)",
    // Each side of the segment must have the same number of brackets
    // [segment] = valid
    // [[segment] = invalid
    // [segment]] = invalid
    // [[...segment]] = valid

    "(?!^\\[{1,2}(\\.{1,2}[^.]|\\.{4,})[^\\[\\]]+?\\]{1,2}|\\[{1,2}[^\\[\\]]+?\\.\\]{1,2}$)",
    // Segment names can't start and end with dots, except for exactly 3 dots at the beggining for catch all segments
    // [segment] = valid
    // [...segment] = valid
    // [[...segment]] = valid
    // [.segment] = invalid
    // [segment.] = invalid
    // [.segment.] = invalid
    // [..segment] = invalid
    // [....segment] = invalid
    // [[....segment]] = invalid

    "^(?:\\[{1,2}\\.{3}|\\[)[^\\[\\]]+?\\]{1,2}$",
    // Segment must have one of the following formats:
    // [segment] for normal required segment
    // [...segment] for catch all required segment
    // [[...segment]] for catch all optional segment
  ].join("")
);

const catchAllOptionalSegmentRegex = /^\[{2}(?:\.{3})[^\[\]]+?\]{2}$/;

const catchAllSegmentRegex = /^\[(?:\.{3})[^\[\]]+?\]$/;

const getRouterModule = (name: string) => {
  const routerModule = name as
    | `${RouterNameModuleControlPanel}`
    | `${RouterNameModuleFront}`;

  return RouterNameModuleControlPanel[
    routerModule as keyof typeof RouterNameModuleControlPanel
  ] !== undefined
    ? "controlPanel"
    : "front";
};

// Add path prefixes
const addPrefixes = (
  link: string,
  route: RouteData,
  routes: RouteConfig
): string => {
  if (route.prefix === undefined) {
    return link;
  }

  link = routes[route.prefix].path + link;

  return routes[route.prefix].prefix !== undefined
    ? addPrefixes(link, routes[route.prefix], routes)
    : link;
};

// Map parameters to path segments
const mapParameters = (
  name: NameParameter,
  path: string,
  dynamicSegments: RegExpMatchArray | null,
  params?: ParamsParameter
) => {
  let segmentValid = true;

  dynamicSegments?.forEach((segment) => {
    segmentValid = segmentFormatRegex.test(segment);

    if (!segmentValid) {
      throw new Error(
        `Dynamic segment ( ${segment} ) has invalid format! Check your route ( name: ${name} ) config in 'website.config.ts'.`
      );
    }

    const _param = segment.match(/^\[{1,2}(?:\.{3})?([^\[\]]+?)\]{1,2}$/);
    const param = (_param as RegExpMatchArray)[1];

    switch (true) {
      case catchAllOptionalSegmentRegex.test(segment):
        if (params === undefined || params[param] === undefined) {
          path = path.replace(`/${segment}`, "");
        } else {
          path = path.replace(`${segment}`, params[param].toString());

          params[param] = undefined;
        }

        break;

      case catchAllSegmentRegex.test(segment):
        if (params === undefined || params[param] === undefined) {
          throw new Error(
            `Missing parameter ( ${param} ) for non-optional catch all segment ( ${segment} )!`
          );
        }

        path = path.replace(`${segment}`, params[param].toString());

        params[param] = undefined;

        break;

      default:
        if (params === undefined || params[param] === undefined) {
          throw new Error(
            `Missing parameter ( ${param} ) for segment ( ${segment} )!`
          );
        }

        path = path.replace(`${segment}`, params[param].toString());

        params[param] = undefined;

        break;
    }
  });

  return path;
};

export const getLink = (name: NameParameter, params?: ParamsParameter) => {
  const _name = name.split(".");
  const routerModule = getRouterModule(_name[0]);
  const route = routerConfig[routerModule].routes[_name[1]];

  if (route === undefined) {
    throw new Error(`Route ( ${name} ) does not exist!`);
  }

  const dynamicSegments = route.path.match(/\[+.+?\]+/g);

  let link = route.path as string;

  link = addPrefixes(link, route, routerConfig[routerModule].routes);

  link = mapParameters(name, link, dynamicSegments, params);

  link = `/${(routerConfig[routerModule].prefix + link).replace(
    /^\/+|\/+$/g,
    ""
  )}`;

  if (params !== undefined) {
    const remainingParams = Object.entries(params).filter((value) => {
      return value[1] !== undefined ? value.toString() : false;
    });

    if (remainingParams.length >= 1) {
      const paramsQuery = new URLSearchParams(remainingParams as string[][]);

      link += `?${paramsQuery}`;
    }
  }

  return link;
};

// Generate permalink
const permalinkPath = getConfig<string>("app.permalinkPath") as RouterName<
  `${RouterNameModuleFront}`,
  string
>;

export const getPermalink = (
  permalink: string | number,
  params?: ParamsParameter
) => {
  return getLink(permalinkPath, { ...params, permalink: permalink });
};
