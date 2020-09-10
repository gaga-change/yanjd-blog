<template>
  <div class="default-layout">
    <!-- 头部 -->
    <div class="header-fa">
      <div class="container header-area">
        <div class="title">
          <h1>
            <nuxt-link to="/">
              title {{ navIndex }}
            </nuxt-link>
          </h1>
        </div>
        <div class="navgiation">
          <ul>
            <li v-for="(item, index) in navs" :key="item.url" :ref="`nav${index}`" @mouseover="navIndex=index" @mouseleave="navIndex=-1">
              <nuxt-link :to="item.url">
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
          <div class="bsas-line" :style="{opacity: navIndex > -1 ? 1 : 0, width: `${navIndex === -1 ? 0 : navWidthArr[navIndex]}px`,right: `${baseLineRight}px`}" />
        </div>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="container page-center">
      <div class="page-con">
        <Nuxt />
      </div>
      <div class="page-right">
        侧边栏
        <div>
          <h3>
            分类
          </h3>
          <ul>
            <li v-for="item in $store.state.categories" :key="item.id">
              {{ item.name }}
            </li>
          </ul>
          <h3>标签</h3>
          <ul>
            <li v-for="item in $store.state.tags" :key="item.id">
              {{ item.name }}
            </li>
          </ul>
          <h3>最新发布</h3>
          <ul>
            <li v-for="item in $store.state.newPosts" :key="item.id">
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navIndex: -1,
      navWidthArr: [],
      navs: [
        {
          url: '/',
          name: '首页'
        },
        {
          url: '/archives',
          name: '归档'
        },
        {
          url: '/about',
          name: '关于我'
        }
      ]
    }
  },
  computed: {
    baseLineRight () {
      let sum = 0
      if (this.navIndex === -1) {
        return 0
      }
      for (let i = this.navWidthArr.length - 1; i > -1; i--) {
        if (i === this.navIndex) {
          break
        }
        sum += this.navWidthArr[i]
      }
      return sum
    }
  },
  mounted () {
    const navWidthArr = this.navs.map((v, i) => {
      return this.$refs[`nav${i}`][0].clientWidth
    })
    this.navWidthArr = navWidthArr
  }
}
</script>

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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
  // 头部
  .header-area {
    // overflow: hidden;
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
      position: relative;
      // overflow: hidden;
      text-align: right;
      height: 60px;
      line-height: 60px;
      ul {
        padding: 0;
        color: rgba(0, 0, 0, 0.85);
        list-style: none;
        font-size: 0;
        li {
          font-size: 1rem;
          display: inline-block;
          a {
            position: relative;
            display: block;
            padding: 0 15px;
            color: inherit;
            text-decoration: none;
            &:hover {
              color: #9933CC;
            }
          }
        }
      }
      .bsas-line {
        position: absolute;
        transition: all .5s;
        width: 100px;
        height: 2px;
        bottom: -1px;
        right: 0;
        background-color: #9933CC;
      }
    }
    @media only screen and (max-width: 768px) {
      .bsas-line {
        display: none;
      }
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
  // 页面中部
  .page-center {
    display: flex;
    overflow: hidden;
    // 内容区域
    .page-con {
      flex: 1;
      position: relative;
      overflow: hidden;
      font-size: 1rem;
    }
    // 侧边栏
    .page-right {
      width: 300px;
      // float: right;
    }
    @media only screen and (max-width: 768px) {
      display: block;
      .page-right {
        width: 100%;
      }
    }
  }
}
</style>
