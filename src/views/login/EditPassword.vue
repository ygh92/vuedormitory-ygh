<template>
  <div class="app-container common-list-page">

    <el-form
      :model="resetForm"
      :rules="resetFormRules"
      ref="resetForm"
      status-icon
      label-width="100px"
    >
      <el-form-item label="旧密码：" prop="password">
        <el-input type="password" placeholder="请输入您的当前密码" v-model="resetForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newpwd">
        <el-input type="password" placeholder="请输入您的新密码" v-model="resetForm.newpwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="newpassword1">
        <el-input type="password" placeholder="请重复您的密码" v-model="resetForm.newpassword1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" style="margin-right: 370px;" icon="el-icon-check" @click.native.prevent="toAmend">确认修改</el-button>
        <el-button type="warning"  icon="el-icon-back" @click.native.prevent="back">取消修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/system/sysUser";
// import { getUsername } from "@/utils/auth";//这是我个人调用封装获取当前账户的username，不作参考
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error("密码长度为6-18位"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetForm.newpwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      resetForm: {
        //传给后台所需要的参数
        password: "",
        newpassword1: "",
      },
      resetFormRules: {
        password: [
          { required: true, message: "请输入旧密码", trigger: 'blur' }
        ],
        newpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newpassword1: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    back(){
      this.$router.push(`/dashboard`);

    },
    toAmend() {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          //这里的api.materialQuery.toAmend是调用前期我们统一的api接口url路径，不作参考 ，只要把后台需要的字段正常传进去即可
          api.materialQuery(this.resetForm)
            .then(res => {
              if(res.code !== 200){
                this.$message({
                  message: res.msg,
                  type: "error",
                  duration: "2000"
                });
                return false;
              }
              if (res.code === 200) {
                this.$message.success("修改成功,3秒后跳转到登录页！");
                setTimeout(() => {
                  this.logout();//调用跳转到登陆页的方法
                }, 3000);
              }
            })
            .catch(() => {});
        }
      });
    },
    //这是修改成功后重新返回登陆页的方法，看个人需要自行调整
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login`);
    }
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 60%;
  margin: 50px auto 0;
  text-align: center;
  button {
    margin: 20px 0 0;
  }
}
</style>
