import { RoleEntity, RoleModel } from "./role_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";

export class RoleService {
  private readonly roleModel: RoleModel;

  constructor() {
    this.roleModel = new RoleModel();
  }

  async create(data: any): Promise<RoleEntity> {
    return await this.roleModel.create(data);
  }

  async delete(id: string): Promise<RoleEntity | null> {
    const role: RoleEntity = await this.detail(id);
    if (role) {
      await this.roleModel.deleteById(id);
      return role;
    } else {
      return null;
    }
  }

  async update(id: string, data: any): Promise<RoleEntity | null> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    const role: RoleEntity = await this.detail(id);
    if (role) {
      await this.roleModel.updateById(id, data);
      return await this.detail(id);
    } else {
      return null;
    }
  }

  async list(options: ListOptions): Promise<RoleEntity[]> {
    return this.roleModel.list(options);
  }

  async count(options: ListOptions): Promise<number> {
    return this.roleModel.count(options);
  }

  async detail(id: string): Promise<RoleEntity> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    return await this.roleModel.findById(id);
  }

  async listByTable(
    options: ListOptions,
    tableOptions: TableOptions,
  ): Promise<RoleEntity[]> {
    return this.roleModel.listByTable(options, tableOptions);
  }
}
