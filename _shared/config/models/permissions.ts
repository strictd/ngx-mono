export class IRoleInfo {
  id: number;
  tag: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export class IComponentInfo {
  id: number;
  tag: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export class IOperationInfo {
  id: number;
  tag: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export class IPermissionInfo {
  id: number;
  role_id: number;
  component_id: number;
  operation_id: number;
  rank: number;
  updated_at: string;
  created_at: string;
}

export class IUserPermissions {
  components: IComponentPermissionList;
  component_tag?: any;
  operation_tag?: any;
  role_tag?: any;
}

export class IComponentPermissionList {
  [index: string]: IComponentPermissions;
}

export class IComponentPermissions {
  operations: Array<number>;
  role_id: number;
  component_tag?: string;
  role_tag?: string;
}

export class IOperationPermissions {
  [index: string]: number;
}
