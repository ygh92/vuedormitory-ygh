<template>
  <div class="dashboard-container">

    <el-descriptions   title="个人信息" :column="2" border>

      <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ info.sex }}</el-descriptions-item>
      <el-descriptions-item label="照片">
          <el-image :src=info.photo alt="用户头像"   class="image" ></el-image>
<!--          <p>描述内容...</p>-->
      </el-descriptions-item>
      <el-descriptions-item label="手机号">{{ info.phone }}</el-descriptions-item>
      <el-descriptions-item label="学号">{{ info.stuNo }}</el-descriptions-item>
      <el-descriptions-item label="辅导员 ">{{ info.instructor }}</el-descriptions-item>
      <el-descriptions-item label="身份证 ">{{ info.idCard }}</el-descriptions-item>
      <el-descriptions-item label="学院">
        <el-tag size="small">{{ info.college }}</el-tag>
        {{ info.classNo }}
      </el-descriptions-item>
      <el-descriptions-item label="寝室号" :contentStyle="{'text-align': 'left'}">
        {{ info.dorNo }}
      </el-descriptions-item>
      <el-descriptions-item label="寝室长" :contentStyle="{'text-align': 'left'}">
        {{ info.dorAdmin }}
      </el-descriptions-item>
    </el-descriptions>

    <div class="tools-div">
      <el-button type="primary" icon="el-icon-edit" size="small" class="button" @click="edit()">修改</el-button>
    </div>
    <el-dialog title="修改学生信息" :visible.sync="dialogVisible" width="90%">
      <!--      学生修改自己个人信息-->
      <el-form   ref="dataForm" :model="info" label-width="100px" size="small"
               style="padding-right: 40px;">
        <el-form-item label="头像"prop="avatar">
          <div style="display: flex;">
            <el-avatar  :size="50" :src="this.info.photo" />
            <StudentImg style="margin-left: 10px;" />
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
        <el-form-item label="寝室号" prop="dorNo">
          <el-input v-model="info.dorNo"/>
        </el-form-item>
        <el-form-item label="寝室长" prop="dorAdmin">
          <el-input v-model="info.dorAdmin"/>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="info.college"/>
        </el-form-item>
        <el-form-item label="班级" prop="classNo">
          <el-input v-model="info.classNo"/>
        </el-form-item>
 <el-form-item label="辅导员" prop="instructor">
          <el-input v-model="info.instructor"/>
        </el-form-item>


      </el-form>
      <!--      管理员修改自己个人信息-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="Update()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '@/api/student/student'
import StudentImg from "@/views/com/StudentImg.vue";
import student from "@/api/student/student";
export default {
  name: 'Dashboard',
  components:{
     StudentImg
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
            this.studentEdit()
        }

      })
    },

    studentEdit() {
      api.updateById(this.info).then(response => {
        this.$message.success(response.message || '操作成功')
        this.dialogVisible = false
        this.$router.push('/student/info');
        this.getStudentInfo()
      })
    },
    getStudentInfo() {
      student.getStudentInfo().then(res=>{
        this.info=res.data
      })
    }
  },
  created() {
    this.getStudentInfo()
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 100px; /* 设置图片宽度 */
  height: 100px; /* 设置图片高度 */
}
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
