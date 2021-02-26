import { PostProEntity, PostProModel } from "./post_pro_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";

export class PostProService {
  private readonly postProModel: PostProModel;

  constructor() {
    this.postProModel = new PostProModel();
  }

  async list(options: ListOptions): Promise<PostProEntity[]> {
    return (await this.postProModel.list(options)).map((v: any) => ({
      ...v,
      tags: v.tags ? v.tags.split(",") : [],
    }));
  }

  async count(options: ListOptions): Promise<number> {
    return this.postProModel.count(options);
  }
}
