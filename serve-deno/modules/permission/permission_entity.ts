import {
  BaseEntity,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";
import { UserEntity } from "../user/user_entity.ts";
import { RoleEntity } from "../role/role_entity.ts";
export interface PermissionEntity extends BaseEntity {
  name?: string;
  type?: number;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
  remark?: string;
  roles?: RoleEntity[];
}

export class PermissionModel extends Model<PermissionEntity> {
  constructor() {
    super("permission", [
      {
        type: "text",
        name: "id",
      },
      {
        type: "text",
        name: "name",
      },
      {
        type: "integer",
        name: "type",
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
        name: "roles",
        sonTable: "role",
        relTable: "role_permission",
        relCurrentKey: "permissionId",
        relSonKey: "roleId",
      },
    ]);
  }
}
