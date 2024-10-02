import { getConfig } from "./config";

enum RouterNameControlPanelPrefixes {
  cp = "cp",
  controlpanel = "controlpanel",
  controlPanel = "controlPanel",
  "control-panel" = "control-panel",
}

enum RouterNameFrontPrefixes {
  front = "front",
}

type RouterName<
  NamePrefix extends string,
  Name extends string
> = `${NamePrefix}.${Name}`;

export type RouteConfig = {
  [key: string]: {
    path: `/${string}`;
    prefix?: string;
  };
};

export type RouterConfig = {
  controlPanel: {
    prefix: `/${string}`;
    routes: RouteConfig;
  };

  front: {
    prefix: `/${string}`;
    routes: RouteConfig;
  };
};

const routerConfig = getConfig<RouterConfig, RouterConfig>("app.router");

export const getLink = (
  name: RouterName<
    `${RouterNameControlPanelPrefixes}` | `${RouterNameFrontPrefixes}`,
    string
  >,
  params?: { [key: string]: string | number | undefined }
) => {
  const _name = name.split(".");

  const _prefix = _name[0] as
    | `${RouterNameControlPanelPrefixes}`
    | `${RouterNameFrontPrefixes}`;

  const prefix =
    RouterNameControlPanelPrefixes[
      _prefix as keyof typeof RouterNameControlPanelPrefixes
    ] !== undefined
      ? "controlPanel"
      : "front";

  const route = routerConfig[prefix].routes[_name[1]];

  if (route === undefined) {
    throw new Error(`Route ( ${name} ) does not exist!`);
  }

  let path = route.path as string;

  const dynamicSegments = route.path.match(/\[+.+?\]+/g);

  let segmentValid = true;

  const segmentFormatRegex =
    /(?!^\[[^\[\]]+?\]{2}|\[{2}[^\[\]]+?\]$)^(?:\[{1,2}(?:\.{3})|\[)(?!\.|[^\[\]]+?\.)[^\[\]]+?\]{1,2}$/;

  const catchAllOptionalSegmentRegex = /^\[{2}(?:\.{3})[^\[\]]+?\]{2}$/;
  const catchAllSegmentRegex = /^\[(?:\.{3})[^\[\]]+?\]$/;

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

  path = `/${(
    routerConfig[prefix].prefix +
    (route.prefix !== undefined
      ? routerConfig[prefix].routes[route.prefix]?.path ?? ""
      : "") +
    path
  ).replace(/^\/+|\/+$/g, "")}`;

  if (params !== undefined) {
    const remainingParams = Object.entries(params).filter((value) => {
      return value[1] !== undefined ? value.toString() : false;
    });

    if (remainingParams.length >= 1) {
      const paramsQuery = new URLSearchParams(remainingParams as string[][]);

      path += `?${paramsQuery}`;
    }
  }

  return path;
};

const permalinkPath = getConfig<string>("app.permalinkPath") as RouterName<
  `${RouterNameControlPanelPrefixes}` | `${RouterNameFrontPrefixes}`,
  string
>;

export const getPermalink = (
  permalink: string | number,
  params?: { [key: string]: string | number | undefined }
) => {
  return getLink(permalinkPath, { ...params, permalink: permalink });
};
