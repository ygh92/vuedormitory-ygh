<template>
  <div class="app-container">

    <div>
      <el-form label-width="70px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="搜索">
              <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="姓名/班级/学院/学号"></el-input>
            </el-form-item>
          </el-col>
          <el-row style="display: flex; justify-content: space-between;">
            <el-button type="primary" icon="el-icon-search" @click="fetchData()">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="resetData">重置</el-button>

            <div class="tools-div" style="flex: 1;">
            </div>
            <div class="tools-div">
              <el-button type="success" icon="el-icon-plus" @click="add">添 加</el-button>
              <!-- Down button -->
              <Down></Down>
            </div>
          </el-row>
        </el-row>
      </el-form>
    </div>
    <!-- 列表 -->
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        @row-dblclick="inFor($event)"
        stripe
        border
        style="width: 100%;margin-top: 10px;">

        <el-table-column
          label="序号"
          width="70"
          align="center">
          <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="college" label="学院"/>
        <el-table-column prop="classNo" label="班级"/>
        <el-table-column prop="dorNo" label="寝室号"/>
        <el-table-column prop="stuNo" label="学号"/>
        <el-table-column prop="phone" label="手机"/>
        <el-table-column prop="updateDate" label="更新时间"/>
        <el-table-column prop="instructor" label="辅导员"/>
        <el-table-column prop="photo" label="头像">
          <template slot-scope="scope">
            <img style="width: 80px;" :src="scope.row.photo" alt="Image">
          </template>
        </el-table-column>
        <el-table-column prop="insPhone" label="辅导员电话"/>


        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" title="修改"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />

    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form ref="dataForm" :model="student" label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="student.name"/>
        </el-form-item>
        <el-form-item label="学院" prop="name">
          <el-input v-model="student.college"/>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="student.phone"/>
        </el-form-item>
        <el-form-item label="寝室号" prop="dorNo">
          <el-input v-model="student.dorNo"/>
        </el-form-item>
        <el-form-item label="寝室长" prop="dorAdmin">
          <el-input v-model="student.dorAdmin"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/student/student'
import Down from "@/layout/components/ExportExcel/DownloadExcel.vue";
const defaultForm = {
  id: '',
  college: '',
  classNo: '',
  name: '',
  stuNo: '',
  dorNo: '',
  dorAdmin: '',
  instructor: '',
  phone: '',
  sex: ''
}
export default {
components: {
  Down
},
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      createTimes: [],
      dialogVisible: false,
      student: defaultForm,
      saveBtnDisabled: false,
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    this.fetchData()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
  },

  methods: {
    inFor(event) {
      console.log(event.id)
      const id=event.id
      // this.$router.push({ name: 'Information', params: { id: id } });
      this.$router.push({path:"/hide/Information/"+id});
    },
    // 当页码发生改变的时候
    changeSize(size) {
      this.limit = size
      this.fetchData(1)
    },

    // 加载banner列表数据
    fetchData(page = 1) {
      this.page = page
      api.getPageList(this.page, this.limit, this.searchObj).then(
        response => {
          //this.list = response.data.list
          this.list = response.data
          this.total = response.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },

    // 重置查询表单
    resetData() {
      this.searchObj = {}
      this.createTimes = []
      this.fetchData()
    },

    // 根据id删除数据

    // -------------
    add() {
      this.student = {
        id: '',
        college: '',
        classNo: '',
        name: '',
        stuNo: '',
        dorNo: '',
        dorAdmin: '',
        instructor: '',
        phone: '',
        sex: ''
      }
      this.dialogVisible = true
      this.student = Object.assign({}, defaultForm)
    },

    edit(id) {
      this.dialogVisible = true
      this.fetchDataById(id)
    },

    fetchDataById(id) {
      api.getById(id).then(response => {
        this.student = response.data
      })
    },

    saveOrUpdate() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          if (!this.student.id) {
            this.saveData()
          } else {
            this.updateData()
          }
        }
      })
    },

    // 新增
    saveData() {
      api.save(this.student).then(response => {
        this.$message.success('操作成功')
        this.dialogVisible = false
        this.fetchData(this.page)
      })
    },

    // 根据id更新记录
    updateData() {
      api.updateById(this.student).then(response => {

        this.$message.success(response.message || '操作成功')
        this.dialogVisible = false

        this.fetchData(this.page)
      })
    }
  }
}
</script>
<style scoped>
.tools-div {
  display: flex;
  justify-content: flex-end;
}
</style>
