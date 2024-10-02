import websiteConfig from "@/website.config";
import { RouterConfig } from "./router";

export type WebsiteConfig = {
  controlPanel: { [key: string]: unknown };
  front: { [key: string]: unknown };
  app: {
    [key: string]: unknown;
    permalinkPath: string;
    router: RouterConfig;
  };
};

export function getConfig<T, B = null>(
  path?: string,
  defaultValue: unknown = null
): T | B {
  if (path === undefined) {
    return websiteConfig as T;
  }

  const paths = path.split(".");
  const valueFirst = (websiteConfig as never)[paths[0]];

  if (
    valueFirst === undefined ||
    (paths.length > 1 && typeof valueFirst !== "object")
  ) {
    return defaultValue as B;
  }

  let config = valueFirst;

  for (let index = 1; index < paths.length; index++) {
    const value = config[paths[index]] ?? undefined;

    if (
      value === undefined ||
      (paths.length - 1 !== index && typeof value !== "object")
    ) {
      return defaultValue as B;
    }

    config = value;
  }

  return config as T;
}
