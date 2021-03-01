import { TagProEntity, TagProModel } from "./tag_pro_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";

export class TagProService {
  private readonly tagProModel: TagProModel;

  constructor() {
    this.tagProModel = new TagProModel();
  }

  async list(options: ListOptions): Promise<TagProEntity[]> {
    return this.tagProModel.list(options);
  }

  async count(options: ListOptions): Promise<number> {
    return this.tagProModel.count(options);
  }
}
