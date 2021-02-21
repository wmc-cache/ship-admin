import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'admin/xxl/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/xxl/index/info',
    method: 'get'

  })
}

export function getDeviceList() {
  return request({
    url: '/admin/xxl/device/1/10',
    method: 'get'

  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

//获取管理用户分页列表
export function getUserList() {
  return request({
    url: "/admin/xxl/user/1/10",
    method: "get"
  })
}
//新增用户
export function addUser(data) {
  return request({
    url: "/admin/xxl/user/save",
    method: "post",
    data
  })
}

