<template>
  <div class="default-layout">
    <!-- 头部 -->
    <div class="header-fa">
      <div class="container header-area">
        <div class="title">
          <h1>
            <nuxt-link to="/">
              title
            </nuxt-link>
          </h1>
        </div>
        <div class="navgiation">
          <ul>
            <li>
              <nuxt-link to="/">
                首页
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/">
                归档
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/">
                关于我
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
@import url('normalize.css/normalize.css');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-size: 14px;
}

a:hover {
  color: #9933CC;
}

.container {
  margin: auto;
  padding: 0 30px;
  max-width: 1080px;
  @media only screen and (max-width: 768px) {
    padding: 0 15px;
  }
}
.default-layout {
  .header-fa {
    border-bottom: 1px solid #e8e8e8;
  }
  .header-area {
    overflow: hidden;
    .title {
      width: 200px;
      float: left;
      height: 60px;
      line-height: 60px;
      h1 {
        margin: 0;
        font-size: 2rem;
        color: rgba(0, 0, 0, 0.85);
        a {
          color: inherit;
          text-decoration: none;
        }
      }
    }
    .navgiation {
      overflow: hidden;
      text-align: right;
      height: 60px;
      line-height: 60px;
      ul {
        padding: 0;
        color: rgba(0, 0, 0, 0.85);
        list-style: none;
        li {
          display: inline-block;
          a {
            position: relative;
            display: block;
            padding: 0 15px;
            color: inherit;
            text-decoration: none;
            &:hover {
              color: #9933CC;
              &:after {
                position: absolute;
                content: ' ';
                width: 100%;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: #9933CC;
              }
            }
          }
        }
      }
    }
    @media only screen and (max-width: 768px) {
      .title {
        width: 100%;
        text-align: center;
        float: none;
      }
      .navgiation {
        text-align: center;
      }
    }
  }
}

 .el-col {
    border-radius: 4px;
  }
</style>
