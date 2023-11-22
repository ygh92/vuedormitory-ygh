import request from '@/utils/request'

const api_name = '/serviceOA/college'

export default {


  getColleges() {
    return request({
      url: `${api_name}/getColleges`,
      method: 'get'
    })
  },



}
