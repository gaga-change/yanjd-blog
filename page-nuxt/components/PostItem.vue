<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="post-item">
      <div class="post-left">
        <h3 class="title">
          <nuxt-link :to="`/archives/${post.id}`">
            {{ post.title }}
          </nuxt-link>
        </h3>
        <p v-if="post.intro" class="intro">
          {{ post.intro }}...
        </p>
        <div class="meta">
          <span class="read-time">
            <em class="iconfont icon-yueduliang" />
            {{ post.readTime }}
          </span>
          <span class="tags-list">
            <em class="iconfont icon-biaoqian-" />
            <span v-for="tag in post.tags" :key="tag.id" class="tag-item">
              <nuxt-link :to="`/tags/${tag.id}`">{{ tag.name }}</nuxt-link>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.post-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #e8e8e8;

  .post-left {
    flex: 1;

    a {
      text-decoration: none;
      transition: all 0.3s;

      // &:hover {
      //   color: #93c;
      // }
    }

    h3.title {
      margin-bottom: 12px;
      font-size: 1.2rem;
      font-weight: normal;

      a {
        font-size: inherit;
        color: rgba(0, 0, 0, 0.65);

        &:hover {
          color: #93c;
        }
      }
    }

    p.intro {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 1rem;
      line-height: 22px;
    }

    .meta {
      // margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 0.8rem;
      line-height: 22px;

      .read-time {
        margin-right: 10px;
        color: inherit;
        font-size: inherit;
      }

      .tags-list {
        color: inherit;
        font-size: inherit;
      }

      span.tag-item {
        a {
          position: relative;
          display: inline-block;
          color: inherit;
          font-size: inherit;
          margin-right: 10px;

          &::after {
            content: " ";
            position: absolute;
            height: 100%;
            width: 1px;
            top: 0;
            background-color: #e8e8e8;
            right: -5.5px;
          }

          &:hover {
            color: #93c;
          }
        }

        &:last-child {
          a {
            // color: red;

            &::after {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
