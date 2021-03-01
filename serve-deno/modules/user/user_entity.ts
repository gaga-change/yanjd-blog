import {
  BaseEntity,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { RoleEntity } from "../role/role_entity.ts";
export interface UserEntity extends BaseEntity {
  name?: string;
  password?: string;
  salt?: string;
  email?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
  remark?: string;
  avatar?: string;
  roles?: RoleEntity[];
}

export class UserModel extends Model<UserEntity> {
  constructor() {
    super("user", [
      {
        type: "text",
        name: "id",
      },
      {
        type: "text",
        name: "name",
      },
      {
        type: "text",
        name: "password",
      },
      {
        type: "text",
        name: "salt",
      },
      {
        type: "text",
        name: "email",
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
        type: "text",
        name: "avatar",
      },
      {
        type: "array",
        name: "roles",
        sonTable: "role",
        relTable: "user_role",
        relCurrentKey: "userId",
        relSonKey: "roleId",
      },
    ]);
  }
}
