<template>
  <div class="dashboard-container">
    <el-row :gutter="24">
      <el-col :xs="24" :md="12">
        <el-card class="card">
          <TagChart />
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-card class="card">
          <CategoryChart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TagChart from '@/views/dashboard/TagChart'
import CategoryChart from '@/views/dashboard/CategoryChart'

export default {
  name: 'Dashboard',
  components: { TagChart, CategoryChart },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .card {
      /*max-width: 400px;*/
      /*display: inline-block;*/
      /*height: 500px;*/
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
