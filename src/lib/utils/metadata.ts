import { Robots, SitemapChangeFreq, SitemapPrio } from "@lib/prisma/db";

export const getRobots = (): { [key: string]: string } => {
  const robots: [key: string, value: string][] = [];

  Object.keys(Robots).map((key) => {
    switch (key) {
      case "NoIndexNoFollow":
        robots.push([key, "No Index, No Follow"]);
        break;

      case "IndexNoFollow":
        robots.push([key, "Index, No Follow"]);
        break;

      case "NoIndexFollow":
        robots.push([key, "No Index, Follow"]);
        break;

      default:
        robots.push([key, "Index, Follow"]);
        break;
    }
  });

  return Object.fromEntries(robots);
};

export const getSitemapPrio = (): { [key: string]: string } => {
  const prio: [key: string, value: string][] = [];

  Object.keys(SitemapPrio).map((key) => {
    switch (key) {
      case "P100":
        prio.push([key, "1.0"]);
        break;

      case "P90":
        prio.push([key, "0.9"]);
        break;

      case "P80":
        prio.push([key, "0.8"]);
        break;

      case "P60":
        prio.push([key, "0.6"]);
        break;

      case "P50":
        prio.push([key, "0.5"]);
        break;

      case "P40":
        prio.push([key, "0.4"]);
        break;

      case "P30":
        prio.push([key, "0.3"]);
        break;

      case "P20":
        prio.push([key, "0.2"]);
        break;

      case "P10":
        prio.push([key, "0.1"]);
        break;

      case "P0":
        prio.push([key, "0.0"]);
        break;

      default:
        prio.push([key, "0.7"]);
        break;
    }
  });

  return Object.fromEntries(prio);
};

export const getSitemapChangeFreq = (): { [key: string]: string } => {
  return SitemapChangeFreq;
};
