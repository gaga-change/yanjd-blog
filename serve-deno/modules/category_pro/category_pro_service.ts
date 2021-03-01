import { CategoryProEntity, CategoryProModel } from "./category_pro_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";

export class CategoryProService {
  private readonly categoryModel: CategoryProModel;

  constructor() {
    this.categoryModel = new CategoryProModel();
  }

  async list(options: ListOptions): Promise<CategoryProEntity[]> {
    return this.categoryModel.list(options);
  }

  async count(options: ListOptions): Promise<number> {
    return this.categoryModel.count(options);
  }
}
