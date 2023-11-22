<script setup>
import dormistory from "@/api/dormistory/dormistory";


export default {
  props: ['room'],
  data() {
    return {
      list: [],
      buttonType: 'primary',// 设置按钮类型为主要类型（primary）
      showPopover: false,
      // 设置悬浮延迟的时间（以毫秒为单位）
      hoverDelay: 0,
      // 定义你想要执行的方法
    };
  },
  methods: {
    toInfo() {
      localStorage.setItem('room', JSON.stringify(this.room));
      // this.$router.push({
      //   name: 'infoRoom', // 目标路由的名称
      // })
      this.$router.push({
        path:'/view/infoRoom'
      })

    },
    getInfoByDor(room) {
      dormistory.getInfoByRoomNo(room).then(
        response => {
          this.list = response.data
        }
      )
    },
    handleHide() {
      // 延迟设置在鼠标离开按钮后触发
      setTimeout(() => {
        this.getInfoByDor(this.room.dorNo); // 执行你想要的方法
        this.showPopover = true; // 隐藏弹出框
      }, this.hoverDelay); // 使用setTimeout来设置延迟时间
    }

  },

};
</script>

<template>
  <div>
    <el-popover
      placement="right"
      width="600"
      :open-delay="1000"
      @show="handleHide"
      v-model="showPopover"
      :visible.sync="showPopover"
      trigger="hover">
      <el-table :data="list" :fit="false">
        <el-table-column width="70" property="name" label="姓名"></el-table-column>
        <el-table-column width="50" property="sex" label="性别"></el-table-column>
        <el-table-column width="100" property="classNo" label="班级"></el-table-column>
        <el-table-column width="100" property="college" label="学院"></el-table-column>
        <el-table-column width="80" property="dorNo" label="寝室号"></el-table-column>
        <el-table-column width="110" property="phone" label="电话号"></el-table-column>
        <el-table-column width="100" property="stuNo" label="学号"></el-table-column>

      </el-table>
      <el-button slot="reference" @click="toInfo" v-bind:type="room.buttonType">{{ list.buttonType }} {{
          this.room.dorNo
        }} <br>已住:{{ this.room.factNo }}<br>容量:{{ this.room.capacityNo }}
      </el-button>
    </el-popover>
  </div>
</template>
<style lang="css" scoped>
.el-button {
  width: 100px; /* 设置宽度 */
  height: 120px; /* 设置高度 */
  margin-bottom: 10px;
  margin-right: 10px;
}

</style>


