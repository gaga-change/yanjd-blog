<template>
  <div class="preview">
    <input ref="file" class="file" type="file" accept="image/*" @change="handleFileChange">
    <img v-if="value" :src="value" alt="">
    <i v-else class="el-icon-plus" />
    <i v-if="value" class="el-icon-close close" @click="clear" />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleFileChange(e) {
      const ele = this.$refs['file']
      const file = ele.files[0]
      // 重置input（不重置会出现无法选重复图片）
      ele.type = 'input'
      ele.type = 'file'
      if (file.size > 1024 * 1024) {
        return this.$message.error('文件大小不能超过1M')
      }
      if (file.type.indexOf('image') === 0) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          // 图片base64化
          const img = new Image()
          img.src = reader.result
          img.onload = () => {
            // 压缩图片
            this.$emit('input', this.image2Base64(img))
          }
        }
      } else {
        return this.$message.error('请选择图片')
      }
    },
    image2Base64(img) {
      const canvas = document.createElement('canvas')
      canvas.width = 60
      canvas.height = 60
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, 60, 60)
      return canvas.toDataURL('image/png')
    },
    clear() {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>
  .preview {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 66px;
    background-color: #eee;
    i {
      font-size: 24px;
      color: #999;
    }
    .close {
      $w: 18px;
      text-align: center;
      position: absolute;
      top: -$w / 2;
      right: -$w /2;
      color: #F56C6C;
      width: $w;
      height: $w;
      font-size: 15px;
      border: 1px solid #F56C6C;
      border-radius: $w/2;
      z-index: 6;
      line-height: $w;
      cursor: pointer;
    }
  }

  .file {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    z-index: 5;
  }
</style>

