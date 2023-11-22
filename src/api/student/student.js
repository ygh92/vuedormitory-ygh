import request from '@/utils/request'

const api_name = '/student'

export default {
  getAll() {
    return request({
      url: `${api_name}/getAll`,
      method: 'get'
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },
  getInfoByInstructor(page, limit, searchObj) {
    return request({
      url: `${api_name}/getInfoByInstructor/${page}/${limit}`,
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
  getStudentInfo() {
    return request({
      url: `${api_name}/getStudentInfo`,
      method: 'get'
    })
  },

  save(student) {
    return request({
      url: `${api_name}/save`,
      // url: `/system/user/sava`,
      method: 'post',
      data: student
    })
  },

  updateById(student) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: student
    })
  },
  changeImg(imgUrl) {
    const img={
      imgUrl:imgUrl
    }
    return request({
      url: `${api_name}/changeImg`,
      method: 'put',

      data:img,
    })
  }
}
