<script>
import dormistory from "@/api/dormistory/dormistory";
import room from "./component/Room.vue";

export default {

  name: "rooms",
  components: {
    room,
  },

  data() {
    return {
      list: [],
      dorNS: [],
      options: [
        {
          value: '1',
          label: '一楼'
        }, {
          value: '2',
          label: '二楼'
        }, {
          value: '3',
          label: '三楼'
        }, {
          value: '4',
          label: '四楼'
        }, {
          value: '5',
          label: '五楼'
        }],
      num: 0,
      floor: null,
      value: '',
      yard: '',
      dialogVisible: false,//一个寝室的所有人的信息
      isAsideVisible: true,
    }
  },
  created() {
    const retrievedData = localStorage.getItem('yard');
    const parsedData = JSON.parse(retrievedData);
    this.yard = parsedData
    this.fetchRooms()
    this.getNumByDor()
  },

  methods: {
    getNumByDor() {
      dormistory.getNumByDor(this.yard).then(
        response => {
          this.num = response.data
        },
      )
    },
    fetchFloor() {
      this.floor = null;
      dormistory.getInfoByDor(this.yard).then(
        response => {
          this.list = response.data
        }
      )
      this.getNumByDor()
    },
    isShowFloor(floor) {
      if (this.floor === null) {
        return true
      } else if (this.floor == floor) {
        return true
      }
      return false
    },
    isShowButton(dorNo, floor) {
      if (dorNo.toString().at(3) === floor.toString()) {
        return true
      } else {
        return false
      }
    },
    fetchRooms() {
      dormistory.getInfoByDor(this.yard).then(
        response => {
          this.list = response.data
        }
      )
    },
    getInfoByDor(floor) {
      this.floor = floor
      dormistory.getInfoByDor(this.yard + floor).then(
        response => {
          this.list = response.data
        }
      )
      dormistory.getNumByDor(this.yard + floor).then(
        response => {
          this.num = response.data
        },
      )
    },
    toggleAside() {
      this.isAsideVisible = !this.isAsideVisible;
    },

  }
}
</script>

<template>
  <div class="dashboard-container">

    <el-container>

      <el-header style="font-size: 20px; height: 101px">
        <el-button
          :icon="!isAsideVisible ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          type=""
          style="position: absolute; top: 10px; right: 10px;"
          @click="toggleAside"
        ></el-button>
        最大容量: {{ num.maxStudent }}
        总人数: {{ num.actualStudent }}
        <br>
        {{ this.yard }}

      </el-header>
      <el-container>

        <el-main class="container">
          <div class="container" v-if="isShowFloor(1)" style="border: 1px solid #71bedc;">
            <div v-for="item in this.list" :key="item.id">
              <room
                v-if="isShowButton(item.dorNo,1)"
                :room=item></room>
            </div>
          </div>
          <div class="container" v-if="isShowFloor(2)" style="border: 1px solid #71bedc;">
            <div v-for="item in this.list" :key="item.id">
              <room
                v-if="isShowButton(item.dorNo,2)"
                :room=item></room>
            </div>
          </div>
          <div class="container" v-if="isShowFloor(3)" style="border: 1px solid #71bedc;">
            <div v-for="item in this.list" :key="item.id">
              <room
                v-if="isShowButton(item.dorNo,3)"
                :room=item></room>
            </div>
          </div>
          <div class="container" v-if="isShowFloor(4)" style="border: 1px solid #71bedc;">
            <div v-for="item in this.list" :key="item.id">
              <room
                v-if="isShowButton(item.dorNo,4)"
                :room=item></room>
            </div>
          </div>
          <div class="container" v-if="isShowFloor(5)" style="border: 1px solid #71bedc;">
            <div v-for="item in this.list" :key="item.id">
              <room
                v-if="isShowButton(item.dorNo,5)"
                :room=item></room>
            </div>
          </div>

        </el-main>
        <!--        <el-footer>2</el-footer>-->
        <el-aside width="360px" v-show="isAsideVisible">

          <el-select v-model="floor" @change="getInfoByDor(floor.toString())" placeholder="请选择楼层">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="medium" style="margin-left: 20px" icon="el-icon-refresh-right"
                     @click="fetchFloor">重置
          </el-button>
        </el-aside>

      </el-container>
    </el-container>


  </div>
</template>

<style lang="scss" scoped>

.container {
  display: flex; /* 使用 flex 布局 */
  flex-wrap: wrap; /* 允许元素换行 */
  //width: 103%;
}

.el-header, .el-footer {
  background-color: rgba(64, 206, 206, 0.91);
  color: #ffffff;
  text-align: center;
  line-height: 40px;
}

.el-aside {
  background-color: rgba(208, 213, 224, 0.99);
  color: #333;
  text-align: center;
  line-height: 50px;
  height: 100vh;

}

.el-main {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  line-height: 100px;
  height: 100vh;
  width: 100vh;
  margin: auto; /* 居中显示 */
  border: 1px solid #ccc; /* 可选：添加边框 */
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
