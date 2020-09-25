<template>
  <div class="default-layout">
    <!-- 头部 -->
    <div class="header-fa">
      <div class="container header-area">
        <div class="title">
          <h1>
            <nuxt-link to="/">
              严俊东博客
              <span class="secondary-title"> &#8211; 分享技术的小站</span>
            </nuxt-link>
          </h1>
        </div>
        <div class="navgiation">
          <ul>
            <li v-for="(item, index) in navs" :key="item.url" :ref="`nav${index}`" @mouseover="navIndex=index" @mouseleave="navIndex=-1">
              <nuxt-link :to="item.url">
                <em :class="`iconfont ${item.icon}`" /> {{ item.name }}
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
        <RightMenu />
      </div>
    </div>
    <div class="footer">
      Copyright © 2019<nuxt-link to="/" class="link">
        严俊东
      </nuxt-link> | <a class="link" rel="nofollow" target="_blank" href="//www.beian.miit.gov.cn">浙ICP备17054210号-2</a>
    </div>
  </div>
</template>

<script>
import RightMenu from '@/components/RightMenu'
export default {
  components: {
    RightMenu
  },
  data () {
    return {
      navIndex: -1,
      navWidthArr: [],
      navs: [
        {
          url: '/',
          name: '首页',
          icon: 'icon-zhuye'
        },
        {
          url: '/archives',
          name: '归档',
          icon: 'icon-guidangicon'
        },
        {
          url: '/about',
          name: '关于我',
          icon: 'icon-wo'
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
  color: #93c;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
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
    padding-top: 5px;
    background: url(/header_bg.jpg) center top repeat-x;
  }
  // 头部
  .header-area {
    // overflow: hidden;
    display: flex;

    .title {
      width: 240px;
      height: 60px;
      line-height: 60px;

      h1 {
        margin: 0;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        font-size: 24px;

        a {
          color: inherit;
          text-decoration: none;
        }

        .secondary-title {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;

          @media only screen and (max-width: 768px) {
            display: none;
          }
        }
      }
    }

    .navgiation {
      flex: 1;
      position: relative;
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
              color: #93c;
            }
          }
        }
      }

      .bsas-line {
        position: absolute;
        transition: all 0.5s;
        width: 100px;
        height: 2px;
        bottom: -1px;
        right: 0;
        background-color: #93c;
      }
    }

    @media only screen and (max-width: 768px) {
      flex-wrap: wrap;

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
      width: 266px;
    }

    @media only screen and (max-width: 768px) {
      display: block;

      .page-right {
        display: none;
        // width: 100%;
      }
    }
  }

  .footer {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    line-height: 1.5;
    color: #bfbfbf;

    a.link {
      text-decoration: none;
      color: inherit;

      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
