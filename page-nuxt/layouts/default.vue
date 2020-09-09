<template>
  <div class="container">
    <!-- 头部 -->
    <el-row>
      <el-col :xs="24" :sm="24" :md="8">
        <div class="">
          ****
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16">
        <div class="">
          导航栏
        </div>
      </el-col>
    </el-row>
    <!-- 主体内容 -->
    <el-row>
      <el-col :xs="24" :sm="16" :md="17">
        <div class="">
          <Nuxt />
        </div>
      </el-col>
      <el-col :xs="24" :sm="8" :md="7">
        <div class="">
          侧边栏
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  margin: auto;
  padding: 0 30px;
  max-width: 1080px;
  @media only screen and (max-width: 768px) {
    padding: 0 15px;
  }
}

 .el-col {
    border-radius: 4px;
  }
</style>
