import { root } from "membrane";

export function getItemsFromResponse(
  json: any,
  path: string,
  args: any,
  self: any
): any[] {
  const last = path.split("/").pop();
  return json[last!];
}

export function getNextPageRef(
  json: any,
  path: string,
  args: any,
  self: any
): any {
  if (json.pagination && json.pagination.next) {
    return self.page({ ...args, until: json.pagination.next });
  }
  return null;
}

export function getSelfGref(obj: any, typeName, self): any | undefined {
  switch (typeName) {
    case "Project":
      return root.projects.one({ idOrName: obj.name }) as any;
    case "Deployment":
      return root.deployments.one({ idOrUrl: obj.uid }) as any;
    case "Alias":
      return root.aliases.one({ idOrAlias: obj.alias }) as any;
  }
}
