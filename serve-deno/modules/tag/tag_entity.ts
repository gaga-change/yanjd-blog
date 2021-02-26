import {
  BaseEntity,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";
import { UserEntity } from "../user/user_entity.ts";
import { PostEntity } from "../post/post_entity.ts";
export interface TagEntity extends BaseEntity {
  name?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
  remark?: string;
  posts?: PostEntity[];
}

export class TagModel extends Model<TagEntity> {
  constructor() {
    super("tag", [
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
        name: "posts",
        sonTable: "post",
        relTable: "post_tag",
        relCurrentKey: "tagId",
        relSonKey: "postId",
      },
    ]);
  }
}
