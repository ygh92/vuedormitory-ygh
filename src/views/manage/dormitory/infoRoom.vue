<template>
  <el-container class="dormitory-info">
    <el-header>
      <h1 class="info-title">{{ dorNo }}</h1>

    </el-header>
    <el-main class="main-content">
      <el-card>
        <p>
  <span class="residents-info">
    居住人数: {{ currentResidents.length }}
  </span>

          <span class="dor-admin-info">
    寝室长: {{ currentResidents[0].dorAdmin }}
  </span>
        </p>


        <el-collapse v-if="currentResidents.length > 0">
          <el-collapse-item v-for="resident in currentResidents" :title=resident.name>
            <el-row>
              <el-col :span="8"><strong>姓名:</strong> {{ resident.name }}</el-col>
              <el-col :span="8"><strong>学号:</strong> {{ resident.stuNo }}</el-col>
              <el-col :span="8"><strong>电话:</strong> {{ resident.phone }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><strong>班级:</strong> {{ resident.classNo }}</el-col>
              <el-col :span="8"><strong>学院:</strong> {{ resident.college }}</el-col>
              <el-col :span="8"><strong>辅导员:</strong> {{ resident.instructor }}</el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <h2 class="info-title">历史居住人员</h2>
        <el-tag v-for="(historicalResident, index) in historicalResidents" :key="index" class="historical-tag">
          {{ historicalResident.name }}
          ({{ historicalResident.studentId }})
        </el-tag>
      </el-card>
    </el-main>

    <el-footer>
      Add footer content if needed
    </el-footer>
  </el-container>
</template>


<script>
import dormistory from "@/api/dormistory/dormistory";

export default {
  methods: {
    fetchData(dorNo) {
      dormistory.getInfoByRoomNo(dorNo).then(response => {
        console.log(response.data)
        this.currentResidents = response.data

      })
    }
  },
  data() {
    return {
      dorNo: '',
      currentResidents: [],
      historicalResidents: [
        {
          name: '张三',
          studentId: '789012',
        },

      ],
    };
  },
  created() {
    const retrievedData = localStorage.getItem('room');
    const parsedData = JSON.parse(retrievedData);
    this.dorNo = parsedData.dorNo
    this.fetchData(this.dorNo)
  }

};
</script>

<style scoped>


.residents-info {
  color: #229327; /* 寝室长文本颜色，你可以根据需要更改 */
  font-weight: bold; /* 居住人数文本加粗，你可以根据需要更改 */
  margin-right: 20px; /* 右边距，你可以根据需要更改 */
}

.dor-admin-info {
  color: #0e55da; /* 寝室长文本颜色，你可以根据需要更改 */
  font-weight: bold; /* 寝室长文本加粗，你可以根据需要更改 */
}

.dormitory-info {
  max-width: 100%;
}

.info-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  margin-left: 50px;
  color: #3a8ee6;
}

.main-content {
  width: 100%;
  margin: 0 auto;
}

.historical-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
