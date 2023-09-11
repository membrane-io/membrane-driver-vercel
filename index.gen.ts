import { state, root, nodes } from "membrane";
import {
  getItemsFromResponse,
  getNextPageRef,
  getSelfGref,
} from "./index.custom";

async function api(
  method: RequestMethod,
  path: string,
  query?: any,
  body?: string
) {
  if (!state.token) {
    throw new Error(
      "You must first invoke the configure action with an API token"
    );
  }
  if (query) {
    Object.keys(query).forEach((key) =>
      query[key] === undefined ? delete query[key] : {}
    );
  }
  const querystr =
    query && Object.keys(query).length ? `?${new URLSearchParams(query)}` : "";
  const url = `https://api.vercel.com/${path}${querystr}`;
  const req = {
    method,
    body,
    headers: {
      Authorization: `Bearer ${state.token}`,
      "Content-Type": "application/json",
    },
  };
  return await fetch(url, req);
}

export const Root = {
  status() {
    if (!state.token) {
      return "Please [configure the Vercel token](https://vercel.com/account/tokens)";
    } else {
      return `Ready`;
    }
  },
  parse({ name, value }, { self }) {
    switch (name) {
      case "project": {
        const url = new URL(value);
        const [, , idOrName] = url.pathname.split("/");

        return [root.projects.one({ idOrName })];
      }
      case "domain": {
        const url = new URL(value);
        const [, , , domain] = url.pathname.split("/");

        return [root.domains.one({ domain })];
      }
      case "deployment": {
        const url = new URL(value);
        const [, , , id] = url.pathname.split("/");

        return [root.deployments.one({ idOrUrl: `dpl_${id}` })];
      }
    }
    return [];
  },
  artifacts: () => ({}),
  deployments: () => ({}),
  certs: () => ({}),
  events: () => ({}),
  aliases: () => ({}),
  files: () => ({}),
  users: () => ({}),
  domains: () => ({}),
  secrets: () => ({}),
  projects: () => ({}),
  verifies: () => ({}),
  integrations: () => ({}),
  teams: () => ({}),
  configure: ({ token }) => {
    state.token = token;
  },
  tests: () => ({}),
};
export const Tests = {
  testGetDeployments: async () => {
    const items = await root.deployments.page.items.$query(`{ name }`);
    return Array.isArray(items);
  },
  testGetProjects: async () => {
    const items = await root.projects.page.items.$query(`{ name }`);
    return Array.isArray(items);
  },
  testGetAliases: async () => {
    const items = await root.aliases.page.items.$query(`{ alias }`);
    return Array.isArray(items);
  },
};
export const Artifact = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Artifact", self);
  },
};
export const Deployment = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Deployment", self);
  },
  build: async (_, { obj }) => {
    const val = obj["build"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  builds: async (_, { obj }) => {
    const items = obj["builds"];
    if (items) {
      return items.map((e: any) => JSON.stringify(e));
    }
  },
  functions: async (_, { obj }) => {
    const val = obj["functions"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  meta: async (_, { obj }) => {
    const val = obj["meta"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  routes: async (_, { obj }) => {
    const items = obj["routes"];
    if (items) {
      return items.map((e: any) => JSON.stringify(e));
    }
  },
  aliasError: async (_, { obj }) => {
    const val = obj["aliasError"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  aliasWarning: async (_, { obj }) => {
    const val = obj["aliasWarning"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  creator: async (_, { obj }) => {
    const val = obj["creator"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  gitSource: async (_, { obj }) => {
    const val = obj["gitSource"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  lambdas: async (_, { obj }) => {
    const items = obj["lambdas"];
    if (items) {
      return items.map((e: any) => JSON.stringify(e));
    }
  },
  team: async (_, { obj }) => {
    const val = obj["team"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  promoteToProduction: async (_, { self }) => {
    const { idOrUrl } = self.$argsAt(root.deployments.one);
    const res = await api("GET", `v13/deployments/${idOrUrl}`);
    const { gitSource, name } = await res.json();

    if (!gitSource) {
      throw new Error(
        "Only Deployments created via Git can be promoted to production."
      );
    }
    await api(
      "POST",
      "v13/deployments",
      null,
      JSON.stringify({
        name,
        target: "production",
        gitSource,
      })
    );
  },
};
export const Cert = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Cert", self);
  },
};
export const Event = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Event", self);
  },
};
export const Alias = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Alias", self);
  },
  creator: async (_, { obj }) => {
    const val = obj["creator"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  deployment: async (_, { obj }) => {
    const val = obj["deployment"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  protectionBypass: async (_, { obj }) => {
    const val = obj["protectionBypass"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
};
export const File = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "File", self);
  },
};
export const User = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "User", self);
  },
};
export const Domain = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Domain", self);
  },
  domain: async (_, { obj }) => {
    const val = obj["domain"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
};
export const Secret = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Secret", self);
  },
};
export const Project = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Project", self);
  },
  analytics: async (_, { obj }) => {
    const val = obj["analytics"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  env: async (_, { obj }) => {
    const items = obj["env"];
    if (items) {
      return items.map((e: any) => JSON.stringify(e));
    }
  },
  latestDeployments: async (_, { obj }) => {
    const items = obj["latestDeployments"];
    if (items) {
      return items.map((e: any) => JSON.stringify(e));
    }
  },
  link: async (_, { obj }) => {
    const val = obj["link"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  passwordProtection: async (_, { obj }) => {
    const val = obj["passwordProtection"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  ssoProtection: async (_, { obj }) => {
    const val = obj["ssoProtection"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  targets: async (_, { obj }) => {
    const val = obj["targets"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  permissions: async (_, { obj }) => {
    const val = obj["permissions"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  lastRollbackTarget: async (_, { obj }) => {
    const val = obj["lastRollbackTarget"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  protectionBypass: async (_, { obj }) => {
    const val = obj["protectionBypass"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
};
export const Verify = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Verify", self);
  },
};
export const Integration = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Integration", self);
  },
};
export const Team = {
  gref: (_, { obj, self }) => {
    return getSelfGref(obj, "Team", self);
  },
};
export const ArtifactCollection = {
  one: async (args) => {
    const res = await api("GET", `v8/artifacts/${args.hash}`);
    return await res.json();
  },
};
export const DeploymentCollection = {
  one: async (args) => {
    const res = await api("GET", `v13/deployments/${args.idOrUrl}`);
    return await res.json();
  },
  page: async (args, { self }) => {
    const path = "v6/deployments";
    const res = await api("GET", path, args);
    const json = await res.json();
    return {
      items: getItemsFromResponse(json, path, args, self),
      next: getNextPageRef(json, path, args, self),
    };
  },
};
export const CertCollection = {
  one: async (args) => {
    const res = await api("GET", `v7/certs/${args.id}`);
    return await res.json();
  },
};
export const EventCollection = {
  page: async (args, { self }) => {
    const path = "v3/events";
    const res = await api("GET", path, args);
    const json = await res.json();
    return {
      items: getItemsFromResponse(json, path, args, self),
      next: getNextPageRef(json, path, args, self),
    };
  },
};
export const AliasCollection = {
  one: async (args) => {
    const res = await api("GET", `v4/aliases/${args.idOrAlias}`);
    return await res.json();
  },
  page: async (args, { self }) => {
    const path = "v4/aliases";
    const res = await api("GET", path, args);
    const json = await res.json();
    return {
      items: getItemsFromResponse(json, path, args, self),
      next: getNextPageRef(json, path, args, self),
    };
  },
};
export const DomainCollection = {
  one: async (args) => {
    const res = await api("GET", `v5/domains/${args.domain}`);
    return await res.json();
  },
  page: async (args, { self }) => {
    const path = "v5/domains";
    const res = await api("GET", path, args);
    const json = await res.json();
    return {
      items: getItemsFromResponse(json, path, args, self),
      next: getNextPageRef(json, path, args, self),
    };
  },
};
export const SecretCollection = {
  one: async (args) => {
    const res = await api("GET", `v3/secrets/${args.idOrName}`);
    return await res.json();
  },
  page: async (args, { self }) => {
    const path = "v3/secrets";
    const res = await api("GET", path, args);
    const json = await res.json();
    return {
      items: getItemsFromResponse(json, path, args, self),
      next: getNextPageRef(json, path, args, self),
    };
  },
};
export const ProjectCollection = {
  one: async (args) => {
    const res = await api("GET", `v9/projects/${args.idOrName}`);
    return await res.json();
  },
  page: async (args, { self }) => {
    const path = "v9/projects";
    const res = await api("GET", path, args);
    const json = await res.json();
    return {
      items: getItemsFromResponse(json, path, args, self),
      next: getNextPageRef(json, path, args, self),
    };
  },
};
export const VerifyCollection = {
  page: async (args, { self }) => {
    const path = "registration/verify";
    const res = await api("GET", path, args);
    const json = await res.json();
    return {
      items: getItemsFromResponse(json, path, args, self),
      next: getNextPageRef(json, path, args, self),
    };
  },
};
export const TeamCollection = {
  one: async (args) => {
    const res = await api("GET", `v2/teams/${args.teamId}`);
    return await res.json();
  },
  page: async (args, { self }) => {
    const path = "v2/teams";
    const res = await api("GET", path, args);
    const json = await res.json();
    return {
      items: getItemsFromResponse(json, path, args, self),
      next: getNextPageRef(json, path, args, self),
    };
  },
};
