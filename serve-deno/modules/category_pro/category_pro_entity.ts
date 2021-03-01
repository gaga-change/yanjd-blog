import {
  BaseEntity,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { UserEntity } from "../user/user_entity.ts";
export interface CategoryProEntity extends BaseEntity {
  name?: string;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
  createdAt?: number;
  updatedAt?: number;
  postCount?: number;
  remark?: string;
}

export class CategoryProModel extends Model<CategoryProEntity> {
  constructor() {
    super("category_pro", [
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
        name: "createdBy",
        foreignTable: "user",
      },
      {
        type: "text",
        name: "updatedBy",
        foreignTable: "user",
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
        type: "integer",
        name: "postCount",
      },
      {
        type: "text",
        name: "remark",
      },
    ]);
  }
}
