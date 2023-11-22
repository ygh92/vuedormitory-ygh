<template>
  <div>
    <el-container>
      <el-header>
        <div>
          二级学院
          <el-select v-model="instructor.college" filterable placeholder="请选择"
                     @change="changeCollege(instructor)">
            <el-option
              v-for="item in colleges"
              :key="item.college"
              :label="item.label"
              :value="item.college">
            </el-option>
          </el-select>
          辅导员
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select=" handleSelect "
          ></el-autocomplete>
          <el-button type="success" plain @click="fetchSearch">重置</el-button>
        </div>
      </el-header>
      <el-container v-loading="listLoading">
        <el-main>
          <div>
            <router-link to="/view/rooms">
              <el-button
                v-for="item in this.dorList"
                v-if="isShowButton(item.address)"
                class="el-button1"
                v-bind:type="item.type"
                @click="saveYard(item.address)">
                <span>{{ item.address }}<br><br><br>可住人数:{{ item.maxStudent }}<br><br>实际人数:{{ item.actualStudent }}</span>
              </el-button>
            </router-link>

          </div>
        </el-main>
        <el-main>
          <div>
<!--            <router-link to="/view/rooms">-->
              <el-button
                v-for="item in this.dorList"
                v-if="!isShowButton(item.address)"
                class="el-button1"
                v-bind:type="item.type"
                @click="saveYard(item.address)">
                <span>{{ item.address }}<br><br><br>可住人数:{{ item.maxStudent }}<br><br>实际人数:{{ item.actualStudent }}</span>
              </el-button>
<!--            </router-link>-->

          </div>
        </el-main>

<!--          <el-aside width="200px"  style="height: 100%" >-->
<!--            XXX学院 的总学生人数为 0 XXX辅导员名下的学生人数为-->
<!--          </el-aside>-->
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import api from '@/api/dormistory/dormistory'
import test from "@/views/manage/dormitory/rooms.vue";
import college from "@/api/dormistory/college";
const defaultForm = {
  id: '',
  address: '',
  yard: '',
  build: '',
  floor: '',
  dorNumber: '',
  capacityNu: '',
  factNu: ''
}
export default {
  components: {
    test
  },
  data() {
    return {
      colleges: [ ],
      college: '',
      listLoading: true, // 数据是否正在加载
      instructor: {}, // 查询表单对象
      dormitory: defaultForm,
      list: [],
      dorList: [],
      instructors: [],
      state: '',
      timeout: null,
      dialogVisible: false, //是否打开信息弹窗
      dialogItem: {} //是否打开信息弹窗
    }
  },
  methods: {
    saveYard(address){
      localStorage.setItem('yard', JSON.stringify(address));
      this.$router.push({
        path: '/view/rooms', // 目标路由的名称

      })
    },
    getColleges(){
      college.getColleges().then(response=>{
        this.colleges=response.data
      })
    },
    isShowButton(address) {
      if (address.includes("东")) {
        return false
      } else {
        return true
      }
    },
    //得到
    changeCollege(instructor) {
      //改变了学院就获取这个学院的所有辅导员
      api.yardByCollege(instructor).then(response => {
        this.dorList = response.data
      })
      this.state = ''
      this.instructor.name = ''
      api.getInstructors(instructor).then(response => {
        this.instructors = response.data
      })
    },
    //重置查询
    fetchSearch() {
      this.instructor = {}
      this.state = ''
      this.fetchDorData()
    },
    //加载所有辅导员
    loadAll() {
      api.getInstructors().then(response => {
        this.instructors = response.data
        // return this.list
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.instructors;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 100 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.instructor.name = item.value
      api.filterByInstructor(this.instructor).then(
        response => {
          this.dorList = response.data
        }
      )
    },
    fetchData() {
      api.showDorS().then(
        response => {
          this.list = response.data
          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
    fetchDorData() {
      api.getYard().then(
        response => {
          this.dorList = response.data
          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
  },
  created() {
    // this.fetchData()
    this.getColleges()
    this.fetchDorData()
  },
  mounted() {
    this.loadAll();
  }
}
</script>
<style scoped lang="css">
.el-button1 {
  width: 110px; /* 设置宽度 */
  height: 100px; /* 设置高度 */
  padding: 10px;
  color: #000000;
//margin-bottom: 30px; margin-left: 10px;
  /* 设置连线样式 */
  border-radius: 5px;
  /* 设置连线颜色 */
}

.el-header, .el-footer {
  background-color: #76a1e8;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 39px;
  height: 100vh;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 100px;
  height: 100vh;
  width: 100vh;

}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
