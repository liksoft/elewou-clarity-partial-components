import { RoleV2 } from "../../../../../../core/auth/contracts";

export class ModuleV2 {
  id!: string | number;
  name!: string;
  description!: string;
  url!: string;
  isActive!: number;
  iconPath!: number;
  roles!: RoleV2[];

  public static getJsonableProperties() {
    return {
      id: "id",
      name: "name",
      description: "description",
      path: "url",
      status: "isActive",
      icon: "iconPath",
      roles: { name: "roles", type: RoleV2 },
    } as {
      [index: string]:
        | keyof ModuleV2
        | { name: keyof ModuleV2; type: new () => any };
    };
  }
}

export const ModuleFormViewModelBindings = (): { [index: string]: any } => {
  return {
    name: "name",
    description: "description",
    path: "url",
    status: "isActive",
    icon: "iconPath",
    roles: "roles",
  };
};
