<template>
  <div class="dashboard-container">


    <el-descriptions   title="个人信息" :column="2" border>

      <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item label="账号">{{ info.username }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ info.phone }}</el-descriptions-item>
      <el-descriptions-item label="角色">{{ info.roleName }}</el-descriptions-item>
      <el-descriptions-item label="身份证号 ">{{ info.idCard }}</el-descriptions-item>
    </el-descriptions>
    <div class="tools-div">
      <el-button type="primary" icon="el-icon-edit" size="small" class="button" @click="edit()">修改</el-button>
    </div>
    <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="90%">
      <!--      用户修改自己个人信息-->

      <el-form   ref="dataForm" :model="info" label-width="100px" size="small"
               style="padding-right: 40px;">
        <el-form-item label="头像">


          <div style="display: flex;">
            <el-avatar shape="square" :size="50"  :src="this.info.avatar" />
<!--            <li :style="{background: `url(${this.info.avatar}) no-repeat center/cover`}"></li>-->

            <imG style="margin-left: 10px;"/>
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="info.name"/>
        </el-form-item>
        <el-form-item label="电话号" prop="phone">
          <el-input v-model="info.phone"/>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="info.idCard"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="Update()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import sysUser from "@/api/system/sysUser";
import user from "@/store/modules/user";
import api from '@/api/student/student'
import imG from "@/views/com/Img.vue";
export default {
  name: 'Dashboard',
  components:{
     imG
  },
  data() {
    return {
      info: {},
      saveBtnDisabled: false,
      dialogVisible: false,
      imageVisible: false,
      imageUrl: '',
    }
  },
  methods: {

    edit() {
      this.dialogVisible = true
    },
    Update() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
            this.managerEdit()
        }

      })
    },
    managerEdit() {
      sysUser.updateById(this.info).then(response => {
        this.$message.success(response.message || '修改成功')
        this.dialogVisible = false
        this.$router.push('/');
        this.getUserInfo()
      })
    },
    getUserInfo() {
      sysUser.getUserInfo().then(response => {
        this.info = response.data
      })
    },
  },
  computed: {

    ...mapGetters([
      'name',
      'role',
    ])
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.button {
  margin-top: 10px;
  position: relative;
  float: right;
}
</style>
