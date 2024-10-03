import {
  BookOpenIcon,
  CogIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
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
          "dashboard/index": {
            path: "/dashboard",
            title: "Dashboard",
            primaryNav: true,
            primaryNavIcon: PresentationChartBarIcon,
          },
          "settings/index": {
            path: "/settings",
            title: "Settings",
            primaryNavIcon: CogIcon,
          },
          "pages/index": {
            path: "/pages",
            title: "Pages",
            primaryNav: true,
            primaryNavIcon: BookOpenIcon,
          },
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
