import { WebsiteConfig } from "@lib/utils/config";

const websiteConfig: WebsiteConfig = {
  controlPanel: {
    title: "Control Panel",
    meta: {
      description: "Sistema de gestión de contenido",
    },
  },

  front: {
    title: "Universae FCT Olyverse NextCMS",
    meta: {
      description: "Sistema de gestión de contenido",
    },
  },

  app: {
    permalinkPath: "front.page/index",

    router: {
      controlPanel: {
        prefix: "/control-panel",
        routes: {
          "dashboard/index": { path: "/dashboard", title: "Dashboard" },
          "pages/index": { path: "/pages", title: "Pages" },
          "pages/edit": {
            path: "/[pageId]",
            parent: "pages/index",
            title: "Edit Page",
          },
        },
      },

      front: {
        prefix: "/",
        routes: {
          "page/index": {
            path: "/[[...permalink]]",
          },
        },
      },
    },
  },
};

export default websiteConfig;
