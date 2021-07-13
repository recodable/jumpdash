import { lazy } from "solid-js";
import type { Block } from "./types";

const setup = {
  name: "Select repository",
  description: "We will track the star from this repository",
  Component: lazy(() => import("./github/SearchRepoForm")),
};

const registry: Block[] = [
  {
    name: "Github Star",
    description:
      "See all your Github stars evolution over time on one repository",
    Component: lazy(() => import("./github/StarBlock")),
    setup: {
      name: "Select repository",
      description: "We will track the star from this repository",
      Component: lazy(() => import("./github/SearchRepoForm")),
    },
  },
  {
    name: "Github Issue",
    description:
      "See how  many issues are open at the moment on one repository",
    Component: lazy(() => import("./github/OpenIssueBlock")),
    setup: {
      name: "Select repository",
      description: "We will track the open issue count from this repository",
      Component: lazy(() => import("./github/SearchRepoForm")),
    },
  },
  {
    name: "Github PR",
    description: "See how  many PR are open at the moment on one reposirory",
    Component: lazy(() => import("./github/OpenPullRequestBlock")),
    setup: {
      name: "Select repository",
      description: "We will track the open PR count from this repository",
      Component: lazy(() => import("./github/SearchRepoForm")),
    },
  },
  {
    name: "NPM Download",
    description: "All NPM downloads informations",
    Component: lazy(() => import("./npm/DownloadBlock")),
    // Setup: lazy(() => import("./github/SearchRepoForm")),
  },
];

export default registry;
