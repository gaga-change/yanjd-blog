import { UserEntity, UserModel } from "./user_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";

export class UserService {
  private readonly userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async create(data: any): Promise<UserEntity> {
    return await this.userModel.create(data);
  }

  async delete(id: string): Promise<UserEntity | null> {
    const user: UserEntity = await this.detail(id);
    if (user) {
      await this.userModel.deleteById(id);
      return user;
    } else {
      return null;
    }
  }

  async update(id: string, data: any): Promise<UserEntity | null> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    const user: UserEntity = await this.detail(id);
    if (user) {
      await this.userModel.updateById(id, data);
      return await this.detail(id);
    } else {
      return null;
    }
  }

  async list(options: ListOptions): Promise<UserEntity[]> {
    return this.userModel.list(options);
  }

  async count(options: ListOptions): Promise<number> {
    return this.userModel.count(options);
  }

  async detail(id: string): Promise<UserEntity> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    return await this.userModel.findById(id);
  }

  async listByTable(
    options: ListOptions,
    tableOptions: TableOptions,
  ): Promise<UserEntity[]> {
    return this.userModel.listByTable(options, tableOptions);
  }
}
