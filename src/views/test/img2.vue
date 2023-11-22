




<template>
  <div>
<!--    <img src="-->
<!--    https://wjlll.oss-cn-beijing.aliyuncs.com/img/1666597857205.jpg">-->

    <label for="upload" class="img-choose" :class="{upLoading: isUploading}">图片上传</label>
    <input type="file" name="" id="upload" accept="image/*" multiple style="display: none;" :disabled="isUploading" @change="onChange" ref="file">
    <p class="tips">一次可以选择多张图片，每次最多选择9张图片（单张图片大小 &lt; 1M）</p>
    <ul class="img-list">
      <li v-for="(item, index) in imgList" :key="index" :style="{background: `url(${item}) no-repeat center/cover`}"></li>
    </ul>


  </div>
</template>

<script>
// 引入阿里云oss包
import OSS from 'ali-oss'
const ACCESSKEY = {
  ID: 'LTAI5t6dFg5ty83sTmpXBNAz',
  SECRET: 'KXQt0BUt6vDXUjkd1DzEN8PyHdgfAY'
}
export default {
  data () {
    return {
      // 创建OSS对象
      client: new OSS({
        region: 'oss-cn-beijing',
        bucket: 'wjlll',
        accessKeyId: ACCESSKEY.ID,
        accessKeySecret: ACCESSKEY.SECRET
      }),
      imgList: [],
      isUploading: false
    }
  },
  methods: {
    onChange () {
      // 可选链
      const picFiles = this.$refs?.file?.files
      console.log(picFiles)
      // 校验
      if (picFiles.length > 9) {
        alert('每次最多选择9张图片')
        return false
      }
      const files = []
      for (const file of picFiles) {
        const picSize = file.size / 1024 / 1024 // 单位转换成 M
        if (picSize > 3) {
          alert('单张图片大小不得超过 2M')
          return false
        }
        files.push(file)
      }
      // 图片上传至OSS
      // this.ossUploadPic(files)
      this.ossUploadPic2(files)
    },
    // 方法一：异步上传图片至阿里云OSS（Promise）
    ossUploadPic (files) {
      this.isUploading = true
      const upLoadRequest = []
      const filePath = `your/desired/directory/${Math.random()}-${file.name}`;
      for (const file of files) {
        upLoadRequest.push(new Promise((resolve, reject) => {
          this.client.put(`img/${Math.random()}-${file.name}`, file).then(res => {
            resolve(res.url)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        }))
      }
      // 读取上传的图片
      Promise.allSettled(upLoadRequest).then(res => {
        console.log(res)
        const imgUrls = []
        for (const item of res) {
          if (item.status === 'fulfilled') {
            imgUrls.push(item.value)
          }
        }
        this.imgList = imgUrls
        this.isUploading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 方法二：异步同步化 async + await
    async ossUploadPic2 (files) {
      this.isUploading = true
      const imgUrls = []
      for (const file of files) {
        const res = await this.client.put(`img/${Math.random()}-${file.name}`, file)
        console.log(res.url)
        imgUrls.push(res.url)
      }
      this.imgList = imgUrls
      this.isUploading = false
    }
  }
}
</script>

<style scoped>
.img-choose {
  display: block;
  width: 100px;
  height: 50px;
  margin-left: 60px;
  line-height: 50px;
  color: #fff;
  background-color: #42B983;
  border-radius: 5px;
}
.tips {
  color: #999;
}
.upLoading {
  background-color: #ccc;
}
.img-list {
  margin-left: 60px;
}
.img-list > li{
  float: left;
  list-style: none;
  width: 150px;
  height: 100px;
  margin: 0 30px 30px 0;
  border: 1px solid #ccc;
}
</style>>

