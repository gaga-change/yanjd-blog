import {
  BaseEntity,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { UserEntity } from "../user/user_entity.ts";
import { CategoryEntity } from "../category/category_entity.ts";
export interface PostProEntity extends BaseEntity {
  title?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
  markdown?: string;
  category?: CategoryEntity;
  intro?: string;
  releaseDate?: number;
  status?: number;
  readTime?: number;
  html?: string;
  tags?: string[];
}

export class PostProModel extends Model<PostProEntity> {
  constructor() {
    super("post_pro", [
      {
        type: "text",
        name: "id",
      },
      {
        type: "text",
        name: "title",
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
        name: "markdown",
      },
      {
        type: "text",
        name: "category",
        foreignTable: "category",
      },
      {
        type: "text",
        name: "intro",
      },
      {
        type: "real",
        name: "releaseDate",
      },
      {
        type: "integer",
        name: "status",
        length: 1,
      },
      {
        type: "integer",
        name: "readTime",
      },
      {
        type: "text",
        name: "html",
      },
      {
        type: "text",
        name: "tags",
      },
    ]);
  }
}
