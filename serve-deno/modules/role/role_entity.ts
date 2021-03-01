import {
  BaseEntity,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { UserEntity } from "../user/user_entity.ts";
import { PermissionEntity } from "../permission/permission_entity.ts";
export interface RoleEntity extends BaseEntity {
  name?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
  remark?: string;
  permissions?: PermissionEntity[];
  users?: UserEntity[];
}

export class RoleModel extends Model<RoleEntity> {
  constructor() {
    super("role", [
      {
        type: "text",
        name: "id",
      },
      {
        type: "text",
        name: "name",
      },
      {
        type: "real",
        name: "createdAt",
      },
      {
        type: "real",
        name: "updatedAt",
      },
      {
        type: "text",
        name: "createdBy",
        foreignTable: "user",
      },
      {
        type: "text",
        name: "updatedBy",
        foreignTable: "user",
      },
      {
        type: "text",
        name: "remark",
      },
      {
        type: "array",
        name: "permissions",
        sonTable: "permission",
        relTable: "role_permission",
        relCurrentKey: "roleId",
        relSonKey: "permissionId",
      },
      {
        type: "array",
        name: "users",
        sonTable: "user",
        relTable: "user_role",
        relCurrentKey: "roleId",
        relSonKey: "userId",
      },
    ]);
  }
}
