<template>
  <div class="right-menu">
    <div>
      <div class="category">
        <h3 class="title-item">
          <em class="iconfont icon-leimupinleifenleileibie" />
          分类
        </h3>
        <ul>
          <li v-for="item in $store.state.categories" :key="item.id">
            <nuxt-link :to="`/categories/${item.id}`">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="tags">
        <h3 class="title-item">
          <em class="iconfont icon-biaoqian-" />
          标签
        </h3>
        <ul>
          <li v-for="item in $store.state.tags" :key="item.id">
            <nuxt-link :to="`/tags/${item.id}`">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="hot-post">
        <h3 class="title-item">
          <em class="iconfont icon-remen" />
          热门文章
        </h3>
        <ul>
          <li v-for="item in $store.state.notPosts" :key="item.id">
            <nuxt-link :to="`/archives/${item.id}`">
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RightMenu'
}
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}

a {
  transition: all 0.3s;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);

  &:hover {
    color: #93c;
  }
}

.right-menu {
  padding: 15px 15px;

  .title-item {
    font-weight: normal;
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  .category,
  .tags {
    border-bottom: 1px solid #e8e8e8;
  }

  .category {
    padding-bottom: 15px;
    line-height: 1.6;

    ul {
      padding-left: 10px;
    }

    li {
      display: block;
    }
  }

  .tags {
    padding: 15px 0;

    li {
      display: inline-block;
    }
  }

  .tags li a {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 3px;
  }

  .category li a {
    position: relative;
    display: block;
    font-size: 1rem;
  }

  .hot-post li a {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .category li a::before {
    transition: all 0.5s;
    content: "";
    z-index: -1;
    position: absolute;
    width: 0%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
  }

  .tags li a:hover,
  .tags li a.nuxt-link-exact-active {
    background-color: #93c;
    color: #fff;
  }

  .category li a:hover,
  .category li a.nuxt-link-exact-active {
    color: #fff;
    padding: 0 0 0 10px;

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: #93c;
    }
  }

  .hot-post {
    padding: 15px 0;
    line-height: 1.6;

    ul {
      padding-left: 10px;
    }
  }
}
</style>
