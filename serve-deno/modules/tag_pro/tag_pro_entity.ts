import {
  BaseEntity,
  Model,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";
import { UserEntity } from "../user/user_entity.ts";
import { PostEntity } from "../post/post_entity.ts";
import { TagEntity } from "../tag/tag_entity.ts";
export interface TagProEntity extends TagEntity {
  postCount?: number;
}

export class TagProModel extends Model<TagProEntity> {
  constructor() {
    super("tag_pro", [
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
      {
        type: "integer",
        name: "postCount",
      },
    ]);
  }
}
