<template>
  <div id="main" style="width: 400px;height:400px;"></div>
</template>

<script>
import dormistory from "@/api/dormistory/dormistory";

export default {
  name: "HelloWord",
  data() {
    return {
      yards: [],
      maxNum: [],
      minNum: [],

    }
  },
  methods: {
    async fetchData() {
      const response=await  dormistory.getInfoYard();
      const data=response.data
      for (let i = 0; i <data.length; i++) {
        this.yards.push(data[i].address)
        this.minNum.push(data[i].actualStudent)
        this.maxNum.push(data[i].maxStudent)
      }
      this.drawChart();
    },

    drawChart() {
      //2. 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));
      //3. 指定图表的配置项和数据
      var option = {
        title: {
          text: '宿舍人数统计'
        },
        tooltip: {},
        legend: {    //图例组件
          data: ['总床位', '人数'],
        },
        xAxis: {
          data: this.yards
        },
        yAxis: {},
        series: [
          {
            name: '总床位',
            type: 'bar',
            data: this.maxNum,
          }, {
            name: '人数',
            type: 'bar',
            data: this.minNum
          },

        ]
      };
      //4.使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

    }
  },
  mounted() {
      this.fetchData();
  },
 }
</script>

<style scoped>

</style>
