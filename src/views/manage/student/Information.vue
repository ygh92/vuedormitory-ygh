<template>
  <div class="student-info">

    <h1 class="info-title"> {{ student.dorNo }}</h1>
    <div>

      <el-card>
        <el-row>
          <el-col :span="6">
            <img :src="student.photo" alt="User Avatar" style="width: 45%; " />
          </el-col>
          <el-col :span="18">
            <!-- User Information -->
            <el-form label-width="100px">
              <el-form-item label="姓名">
                {{ student.name }}
              </el-form-item>
              <el-form-item label="学号">
                {{ student.stuNo }}
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>
      </el-card>
      <Room :dorNo="dorNo"></Room>
    </div>
  </div>
</template>

<script>
import student from "@/api/student/student";
import Room from "@/views/manage/student/Room.vue";
import {mapGetters} from "vuex";
 export default {
  components:{
    Room
  },
   computed: {
     ...mapGetters([
       'sidebar',
       'avatar'
     ])
   },
  data() {
    return {
      student:null,
      stuId: null,
      dorNo: ''
    };
  },

  created() {
    this.stuId = parseInt(this.$route.params.stuId);
    student.getById(this.stuId).then(res=>{
      this.student=res.data
      this.dorNo=res.data.dorNo
    })
    console.log(this.dorNo)
  },

}
</script>
<style scoped>
.info-title {
  font-size: 1.5em;
  margin-bottom: 0px;
  color: #3a8ee6;
}
.student-info {
  padding: 20px;
}
</style>
