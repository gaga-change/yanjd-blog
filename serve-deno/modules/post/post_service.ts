import { PostEntity, PostModel } from "./post_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";

export class PostService {
  private readonly postModel: PostModel;

  constructor() {
    this.postModel = new PostModel();
  }

  async create(data: any): Promise<PostEntity> {
    return await this.postModel.create(data);
  }

  async delete(id: string): Promise<PostEntity | null> {
    const post: PostEntity = await this.detail(id);
    if (post) {
      await this.postModel.deleteById(id);
      return post;
    } else {
      return null;
    }
  }

  async update(id: string, data: any): Promise<PostEntity | null> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    const post: PostEntity = await this.detail(id);
    if (post) {
      await this.postModel.updateById(id, data);
      return await this.detail(id);
    } else {
      return null;
    }
  }

  async list(options: ListOptions): Promise<PostEntity[]> {
    return this.postModel.list(options);
  }

  async count(options: ListOptions): Promise<number> {
    return this.postModel.count(options);
  }

  async detail(id: string): Promise<PostEntity> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    return await this.postModel.findById(id);
  }

  async listByTable(
    options: ListOptions,
    tableOptions: TableOptions,
  ): Promise<PostEntity[]> {
    return this.postModel.listByTable(options, tableOptions);
  }
}
