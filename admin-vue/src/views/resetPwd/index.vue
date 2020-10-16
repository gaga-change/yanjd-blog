<template>
  <div class="resetPwdFormFa">
    <div class="resetPwdForm">
      <h2>重置密码</h2>
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="新密码" prop="pwd">
          <el-input v-model="formData.pwd" placeholder="新密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { resetPwd } from '@/api/user'
export default {
  data() {
    return {
      formData: {
        pwd: undefined
      },
      rules: {
        pwd: [
          { required: true, message: '必填项', tigger: ['blur', 'change'] },
          { min: 3, max: 20, message: '长度在3~20个字符' }
        ]
      }
    }
  },
  created() {
    console.log(this.$route.params.code)
  },
  methods: {
    handleConfirm() {
      console.log(this.$route.params.code)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          resetPwd(this.$route.params.code, this.formData.pwd).then(async res => {
            this.$message.success('密码修改成功')
            await this.$store.dispatch('user/logout')
            this.$router.replace('/login')
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.resetPwdFormFa {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.resetPwdForm {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px 40px;
  box-shadow: 6px 6px 10px #888;
  h2 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
