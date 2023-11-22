<template>
  <div>
    <div id="main" style="width: 400px;height:400px;"></div>

  </div>
</template>

<script>
import dormistory from "@/api/dormistory/dormistory";
export default {
  name: "院落统计",
  data() {
    return {
       dorS:'',
      yards:["西1a", "西1b", "西2a", "西2b", "西3a", "西3b","西3c"],
      num:[30,10,10,10,10,10,]
    }
  },
  methods: {

    fetchData(){
      dormistory.getYard().then(response=>{
        this.dorS=response.data
      })
      this.dorS.forEach(function (dor){
        console.log(dor)
      })
    },
    drawChart() {
      //2. 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));
      //3. 指定图表的配置项和数据
      var option = {
        title: {
          text: '院落统计'
        },
        tooltip: {},
        xAxis: {

          // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          data: this.yards

        },
        yAxis: {},
        series: [
          {
            name: '男生',
            type: 'bar',
            data: [this.num.at(0), 20, 36, 10, 10, 20],
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: 'solid',
              borderColor: '#17a7de',
              shadowColor: '#52669d',
              shadowBlur: 3
            }
          },
          {
            name: '女生',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
              barBorderRadius: 5,
              color:'#53ff40',
              shadowColor: '#14358d',
              borderWidth: 1,
              borderType: 'solid',
              shadowBlur: 3
            }

          },

        ],
      };
      //4.使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.drawChart();
  },
 }
</script>

<style scoped>

</style>
