import { PermissionEntity, PermissionModel } from "./permission_entity.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.2/mod.ts";
import {
  ListOptions,
  TableOptions,
} from "https://gitee.com/yanjd/qapi/raw/0.6.9/dex_pro/mod.ts";

export class PermissionService {
  private readonly permissionModel: PermissionModel;

  constructor() {
    this.permissionModel = new PermissionModel();
  }

  async create(data: any): Promise<PermissionEntity> {
    return await this.permissionModel.create(data);
  }

  async delete(id: string): Promise<PermissionEntity | null> {
    const permission: PermissionEntity = await this.detail(id);
    if (permission) {
      await this.permissionModel.deleteById(id);
      return permission;
    } else {
      return null;
    }
  }

  async update(id: string, data: any): Promise<PermissionEntity | null> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    const permission: PermissionEntity = await this.detail(id);
    if (permission) {
      await this.permissionModel.updateById(id, data);
      return await this.detail(id);
    } else {
      return null;
    }
  }

  async list(options: ListOptions): Promise<PermissionEntity[]> {
    return this.permissionModel.list(options);
  }

  async count(options: ListOptions): Promise<number> {
    return this.permissionModel.count(options);
  }

  async detail(id: string): Promise<PermissionEntity> {
    if (!id) throw new GQLError({ type: "id不能为空" });
    return await this.permissionModel.findById(id);
  }

  async listByTable(
    options: ListOptions,
    tableOptions: TableOptions,
  ): Promise<PermissionEntity[]> {
    return this.permissionModel.listByTable(options, tableOptions);
  }
}
