


<template>
  <div >
    <label for="upload" class="img-choose" :class="{ 'upLoading': isUploading }">
      <i class="el-icon-upload"   ></i> {{ isUploading ? '' : '修改照片' }}
    </label>
    <input type="file" id="upload" accept="image/*" multiple style="display: none;" :disabled="isUploading" @change="onChange" ref="file">
  </div>
</template>





<script>
// 引入阿里云oss包
import OSS from 'ali-oss'
import Student from "@/api/student/student";
import user from "@/store/modules/user";
const ACCESSKEY = {
  ID: 'LTAI5t6dFg5ty83sTmpXBNAz',
  SECRET: 'KXQt0BUt6vDXUjkd1DzEN8PyHdgfAY'
}
export default {
  props: ['flash'],
  data () {
    return {
      // 创建OSS对象
      client: new OSS({
        region: 'oss-cn-beijing',
        bucket: 'wjlll',
        accessKeyId: ACCESSKEY.ID,
        accessKeySecret: ACCESSKEY.SECRET
      }),
      isUploading: false,
      imgUrl: ''
    }
  },
  methods: {
    onChange () {
      // 可选链
      const picFiles = this.$refs?.file?.files
      console.log(picFiles)
      // 校验
      if (picFiles.length > 1) {
        alert('每次最多选择1张图片')
        return false
      }
      const files = []
      for (const file of picFiles) {
        const picSize = file.size / 1024 / 1024 // 单位转换成 M
        if (picSize > 6) {
          alert('单张图片大小不得超过 3M')
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
      for (const file of files) {
        upLoadRequest.push(new Promise((resolve, reject) => {
          this.client.put(`StudentImg/${Math.random()}${file.name}`, file).then(res => {
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
        const res = await this.client.put(`StudentImg/${Math.random()}-${file.name}`, file)
        console.log(res.url)
        imgUrls.push(res.url)
        this.imgUrl=res.url

      }
      console.log(this.imgUrl)
      Student.changeImg(this.imgUrl).then(res=>{
        if (res.code!=200){
          this.$message.error('更换头像失败！')

        }
        else {
          // this.flash()
          this.$message.success('更换头像成功！')
        }
      })
      this.isUploading = false
    }
  }
}
</script>


<style scoped>
.img-choose {
  display: inline-block;
  padding: 8px 16px;
  border: 2px solid #409EFF;
  border-radius: 4px;
  color: #409EFF;
  cursor: pointer;
  transition: background-color 0.3s;
}

.img-choose:hover {
  background-color: #409EFF;
  color: #fff;
}

.upLoading {
  cursor: not-allowed;
}

.upLoading i {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
