<template>
  <div class="app-container">
    <BaseTablePro
      :table-config="tableConfig"
      :search-config="searchConfig"
      md-name=""
      :fetch-list="tagIndex"
    />
  </div>
</template>
<script>

import BaseTablePro from '@/components/Base2/BaseTablePro'
import { tagIndex } from '@/api/tags'

export default {
  components: { BaseTablePro },
  data() {
    const tableConfig = [
      { label: '名称', prop: 'name' },
      { label: '创建时间', prop: 'createdAt', type: 'time', width: 140 },
      { label: '修改时间', prop: 'updatedAt', type: 'time', width: 140 }
    ]
    const searchConfig = [
      { label: '名称', prop: 'name_contains' }
    ]
    return {
      tableConfig,
      searchConfig,
      tagIndex
    }
  }
}
</script>
