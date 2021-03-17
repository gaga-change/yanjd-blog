<template>
  <div>
    <div class="page-detail">
      <div>
        <h1 class="title">
          关于本站
        </h1>
        <div class="md-style">
          <section class="el-drawer__body">
            <div data-v-2c0c9c33="" class="app-container">
              <h3>博客项目开源地址</h3>
              <p>
                网站开源地址：<br>
                <a target="_blank" href="https://gitee.com/yanjd/yanjd-blog">https://gitee.com/yanjd/yanjd-blog</a>
              </p>
              <p>项目目录详解</p>
              <p>
                | - admin-vue  <a target="_blank" href="https://www.yanjd.top/admin">后台管理 vue + element-ui</a><br>
                | - page-nuxt <a target="_blank" href="https://www.yanjd.top">前台页面  nuxt.js(ssr)</a><br>
                | - serve-deno <a target="_blank" href="https://www.yanjd.top/graphql">后端接口服务 deno+graphql+sqlite</a>
              </p>
              <h3>使用到的技术</h3>
              <ul>
                <li>javscript</li>
                <li>scss</li>
                <li>es6</li>
                <li>TypeScript</li>
                <li>deno</li>
                <li>sqlite</li>
                <li>vue</li>
                <li>nuxt</li>
                <li>element-ui</li>
              </ul>
              <h3>问题反馈，或者提意见</h3>
              <!--              <p><i class="fa fa-user" />微信:<a href="//www.yanjd.top">gaga_change</a></p>-->
              <p><i class="fa fa-user" />issues:<a href="https://gitee.com/yanjd/yanjd-blog/issues">https://gitee.com/yanjd/yanjd-blog/issues</a></p>
              <!--              <p><i class="fa fa-envelope" />邮箱:<a target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=q8zKzMr0yMPKxczO69rahcjExg" style="text-decoration: none;">gaga_change@qq.com</a></p>-->
              <!--              <p>-->
              <!--                <i class="fa fa-github" />-->
              <!--                GitHub:<a href="https://github.com/gaga-change" target="_blank" rel="noopener">@gaga-change</a>-->
              <!--              </p>-->
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: '关于我 - 严俊东博客'
  }
}
</script>

<style lang="scss" scoped>
.page-detail {
  padding-top: 20px;
  color: #34495e;

  .title {
    padding-bottom: 0.4rem;
    font-size: 2.2rem;
    line-height: 1.3;
    margin-top: 0;
    margin-bottom: 0.5em;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }

  p {
    margin: 0.8em 0;
    line-height: 1.6;
  }

  a {
    color: #42b983;
    font-weight: 600;
    padding: 0 2px;
    text-decoration: none;
  }
}
</style>
