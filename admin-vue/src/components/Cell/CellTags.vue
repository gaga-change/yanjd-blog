<template>
  <span>
    <el-tag v-for="item in row.tagArr || []" :key="item.id" type="primary" class="mr5">
      {{ item.name }}
    </el-tag>
  </span>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  }
}
</script>
