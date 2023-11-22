<template>
  <div class="export-to-excel">
    <el-button type="primary" @click="onDownload"> 导  出 所有学生的数据 </el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>

import student from "@/api/student/student";
const data = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]
export default {
  name: 'Export2Excel',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    onDownload () {
      this.$message({ type: 'warning', message: '数据读取中，请稍后' })
      this.loading = true
      // this.tableData = data
      const filename = '数据报表'
      const autoWidth = true
      const bookType = 'xlsx'
      const header = ['日期', '姓名']
      const headValue = ['date', 'name']
      const formatJson = (headValue, jsonData) => {
        return jsonData.map((v) => headValue.map((j) => v[j]))
      }
      this.$confirm('确定导出内容', '提示', {
        cancelButtonClass: 'btn-custom-cancel',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        import('@/vendor/Export2Excel.js').then(moudle => {
          moudle.export_json_to_excel({
            header,
            data: formatJson(headValue, this.tableData),
            filename,
            autoWidth,
            bookType
          })
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消导出' })
      })
    },
    getAllData () {
      student.getPageList(1,20).then(
        response => {
          this.tableData = response.data
          console.log(this.tableData.length)
        }
      )
    }
  },
  mounted () {
   this.getAllData()
  }
}
</script>

<style scoped lang="scss">
</style>
