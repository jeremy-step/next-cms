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
    permalinkPath: "front.page",

    router: {
      controlPanel: {
        prefix: "/control-panel",
        routes: {
          dashboard: { path: "/dashboard" },
          pages: { path: "/pages", prefix: "dashboard" },
        },
      },

      front: {
        prefix: "/",
        routes: {
          page: {
            path: "/[[...permalink]]",
          },
        },
      },
    },
  },
};

export default websiteConfig;
