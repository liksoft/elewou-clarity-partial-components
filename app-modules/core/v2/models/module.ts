import { RoleV2 } from '../../../../../../core/auth/contracts/v2/authorizations/role';

export class ModuleV2 {
  id: string|number = undefined;
  name: string = undefined;
  description: string = undefined;
  url: string = undefined;
  isActive: number = undefined;
  iconPath: number = undefined;
  roles: RoleV2[] = undefined;

  public static getJsonableProperties() {
    return {
      id: 'id',
      name: 'name',
      description: 'description',
      path: 'url',
      status: 'isActive',
      icon: 'iconPath',
      roles: { name: 'roles', type: RoleV2 }
    } as { [index: string]: keyof ModuleV2 | { name: keyof ModuleV2, type: new () => any } };
  }
}

export const moduleFormViewModelBindings = (): { [index: string]: any } => {
  return {
    name: 'name',
    description: 'description',
    path: 'url',
    status: 'isActive',
    icon: 'iconPath',
    roles: 'roles'
  };
};
