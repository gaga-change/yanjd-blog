<template>
  <div class="resetPwdFormFa">
    <div class="resetPwdForm">
      <h2>重置密码</h2>
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="formData.newPwd" placeholder="新密码" type="password" style="width: 200px" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="formData.confirmPwd" placeholder="新密码" type="password" style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { resetPwd } from '@/api/auth'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        newPwd: '',
        confirmPwd: ''
      },
      rules: {
        newPwd: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
          { min: 6, max: 20, message: '长度在6~20个字符' }
        ],
        confirmPwd: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          resetPwd(this.formData.newPwd).then(async _ => {
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
  margin-top: -50px;
  justify-content: center;
}
.resetPwdForm {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 40px 80px;
  box-shadow: 3px 3px 10px #888;
  h2 {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
