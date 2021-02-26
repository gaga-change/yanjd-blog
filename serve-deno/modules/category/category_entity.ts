import {
  BaseEntity,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";
import { UserEntity } from "../user/user_entity.ts";
export interface CategoryEntity extends BaseEntity {
  name?: string;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
  createdAt?: number;
  updatedAt?: number;
  remark?: string;
}

export class CategoryModel extends Model<CategoryEntity> {
  constructor() {
    super("category", [
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
        type: "text",
        name: "remark",
      },
    ]);
  }
}
