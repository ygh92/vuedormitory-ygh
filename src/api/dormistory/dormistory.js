import request from '@/utils/request'

const api_name = '/dormitory'

export default {


  getByCondition(id) {
    return request({
      url: `${api_name}/getByCondition`,
      method: 'get',
      data: id
    })
  },
  getInfoByDor(address) {
    return request({
      url: `${api_name}/getInfoByDor`,
      method: 'post',
      params: {
        address: address
      }
    })
  },
  getNumByDor(address) {
    return request({
      url: `${api_name}/getNumByDor`,
      method: 'post',
      params: {
        address: address
      }
    })
  },
  getInfoByRoomNo(room) {
    return request({
      url: `${api_name}/getInfoByRoomNo`,
      method: 'post',
      params: {
        room: room
      }
    })
  },
  filterByInstructor(instructor) {
    return request({
      url: `${api_name}/filterByInstructor`,
      method: 'get',
      params: instructor
    })
  },
  getInstructors(instructor) {
    return request({
      url: `${api_name}/getInstructors`,
      method: 'get',
      params: instructor

    })
  },
  showDorS() {
    return request({
      url: `${api_name}/showDorS`,
      method: 'get'
    })
  },
  fetchDor() {
    return request({
      url: `${api_name}/fetchDor`,
      method: 'get'
    })
  },

  getYard() {
    return request({
      url: `${api_name}/getYard`,
      method: 'get'
    })
  },
  yardByCollege(instructor) {
    return request({
      url: `${api_name}/yardByCollege`,
      method: 'get',
      params: instructor
    })
  },
  getInfoYard() {
    return request({
      url: `${api_name}/getInfoYard`,
      method: 'get',
    })
  },
  getYardName() {
    return request({
      url: `${api_name}/getYardName`,
      method: 'get',
    })
  },
  getMinNum() {
    return request({
      url: `${api_name}/getMinNum`,
      method: 'get',
    })
  },
  getMaxNum() {
    return request({
      url: `${api_name}/getMaxNum`,
      method: 'get',
    })
  },


}
