<template>
  <div>
    <div ref="vantaRef" style="width:100%;height:100vh" />
    <div class="my_title">
      <div>
        <em>景院系统管理</em><br>
        <span>此应用致力于打造便捷且易于管理学生生活 </span>
      </div>
      <h6>尊敬的用户，非常抱歉本网站目前正在优化阶段，可能会存在一些问题或者不便之处。如果您在浏览网站时遇到任何问题，
        <br> 请通过以下方式联系我们：请关注微信公众号：<br> ——————云上景院——————<br> 公众号内留言交流，我们会发布优化进展及解决方案。</h6>
      <a href="../dashboard"><p class="my_title_two">应用名：管理系统 | 开发者：景院信工工作室<br>
        版本号：1.0 | 时间：2023.11.3</p></a>
    </div>
  </div>

</template>

<script>
import * as THREE from 'three'
import Halo from 'vanta/src/vanta.halo'
export default {
  name: 'Hello',
  data() {
    return {

    }
  },
  mounted() {
    this.vantaEffect = Halo({
      el: this.$refs.vantaRef,
      THREE: THREE
    })
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },
  methods: {

  }

}
</script>

<style>
.my_title{
  z-index: 999;
  position: fixed;
  top: 10%;
  left: 10%;
  color: #cc7fff;
  font-size: 30px;
  font-weight: bolder;
}
  p.my_title_two{
    font-size: 18px;
    color: #8c939d;
    padding: -50px 600px;
  }
  h6{
    font-size: 28px;
    padding: 100px 200px;
    color: #ffffff;
  }

</style>
