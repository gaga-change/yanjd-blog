<template>
  <span>
    <el-avatar shape="square" size="medium" :src="row.avatar || defImg" />
  </span>
</template>
<script>
import defImg from '@/assets/img/avatar_default.png'
export default {
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defImg
    }
  }
}
</script>
<style lang="scss" scoped>
  img {

  }
</style>
