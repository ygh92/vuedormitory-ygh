<template>
  <div>
    <div class="container">
      <el-button icon="el-icon-download" @click="showSelectionDialog">导出</el-button>
      <!-- 其他内容 -->
    </div>
    <el-dialog title="选择学院和班级" :visible.sync="dialogVisible" width="400px">
      <el-select v-model="selectedCollege" placeholder="选择学院" @change="loadClasses">
        <el-option v-for="college in colleges" :key="college.value" :label="college.label" :value="college.value" />
      </el-select>

      <el-select v-model="selectedClass" placeholder="选择班级">
        <el-option v-for="classItem in classes" :key="classItem.value" :label="classItem.label" :value="classItem.value" />
      </el-select>

      <el-button @click="download">下载</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      selectedCollege: null,
      selectedClass: null,
      colleges: [
        { label: '学院A', value: 'collegeA' },
        { label: '学院B', value: 'collegeB' },
        // 添加其他学院
      ],
      classes: [],
    };
  },
  methods: {
    showSelectionDialog() {
      // 打开选择框弹窗
      this.dialogVisible = true;
    },
    loadClasses() {
      // 模拟加载班级数据，实际中你需要从后端获取
      if (this.selectedCollege === 'collegeA') {
        this.classes = [
          { label: '班级A1', value: 'classA1' },
          { label: '班级A2', value: 'classA2' },
          // 添加其他班级
        ];
      } else if (this.selectedCollege === 'collegeB') {
        this.classes = [
          { label: '班级B1', value: 'classB1' },
          { label: '班级B2', value: 'classB2' },
          // 添加其他班级
        ];
      } else {
        this.classes = [];
      }
    },
    download() {
      // 在这里执行下载操作，使用选定的学院和班级信息
      console.log('Downloading:', this.selectedCollege, this.selectedClass);

      // 关闭选择框弹窗
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>

</style>
