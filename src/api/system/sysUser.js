import request from '@/utils/request'

const api_name = '/system/user'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },
  getUserInfo() {
    return request({
      url: `${api_name}/getUserInfo`,
      method: 'get'
    })
  },

  save(user) {
    return request({
      url: `${api_name}/save`,
      // url: `/system/user/sava`,
      method: 'post',
      data: user
    })
  },

  updateById(user) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: user
    })
  },

  materialQuery(resetForm) {
    return request({
      url: `${api_name}/resetForm`,
      method: 'put',
      data: resetForm
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  } ,
  changeImg(imgUrl) {
    const img={
      imgUrl:imgUrl
    }
    return request({
      url: `${api_name}/changeImg`,
      method: 'put',

      data:img,
      // data:JSON.stringify(imgUrl),
    })
  }
}
