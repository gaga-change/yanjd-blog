import { TagEntity, TagModel } from "./tag_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.8/dex_pro/mod.ts";

export class TagService {
  private readonly tagModel: TagModel;

  constructor() {
    this.tagModel = new TagModel();
  }

  async create(data: any): Promise<TagEntity> {
    return await this.tagModel.create(data);
  }

  async delete(id: string): Promise<TagEntity | null> {
    const tag: TagEntity = await this.detail(id);
    if (tag) {
      await this.tagModel.deleteById(id);
      return tag;
    } else {
      return null;
    }
  }

  async update(id: string, data: any): Promise<TagEntity | null> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    const tag: TagEntity = await this.detail(id);
    if (tag) {
      await this.tagModel.updateById(id, data);
      return await this.detail(id);
    } else {
      return null;
    }
  }

  async list(options: ListOptions): Promise<TagEntity[]> {
    return this.tagModel.list(options);
  }

  async count(options: ListOptions): Promise<number> {
    return this.tagModel.count(options);
  }

  async detail(id: string): Promise<TagEntity> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    return await this.tagModel.findById(id);
  }

  async listByTable(
    options: ListOptions,
    tableOptions: TableOptions,
  ): Promise<TagEntity[]> {
    return this.tagModel.listByTable(options, tableOptions);
  }
}
