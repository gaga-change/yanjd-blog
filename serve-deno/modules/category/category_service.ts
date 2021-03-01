import { CategoryEntity, CategoryModel } from "./category_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";

export class CategoryService {
  private readonly categoryModel: CategoryModel;

  constructor() {
    this.categoryModel = new CategoryModel();
  }

  async create(data: any): Promise<CategoryEntity> {
    return await this.categoryModel.create(data);
  }

  async delete(id: string): Promise<CategoryEntity | null> {
    const category: CategoryEntity = await this.detail(id);
    if (category) {
      await this.categoryModel.deleteById(id);
      return category;
    } else {
      return null;
    }
  }

  async update(id: string, data: any): Promise<CategoryEntity | null> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    const category: CategoryEntity = await this.detail(id);
    if (category) {
      await this.categoryModel.updateById(id, data);
      return await this.detail(id);
    } else {
      return null;
    }
  }

  async list(options: ListOptions): Promise<CategoryEntity[]> {
    return this.categoryModel.list(options);
  }

  async count(options: ListOptions): Promise<number> {
    return this.categoryModel.count(options);
  }

  async detail(id: string): Promise<CategoryEntity> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    return await this.categoryModel.findById(id);
  }

  async listByTable(
    options: ListOptions,
    tableOptions: TableOptions,
  ): Promise<CategoryEntity[]> {
    return this.categoryModel.listByTable(options, tableOptions);
  }
}
