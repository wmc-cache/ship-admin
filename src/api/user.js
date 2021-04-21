import request from '@/utils/request'
// 用户登录
export function login(data) {
  return request({
    url: 'admin/xxl/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo() {
  return request({
    url: '/admin/xxl/index/info',
    method: 'get'

  })
}

// 获取产品列表
export function getProductList(page, pageSize) {
  return request({
    url: `/admin/xxl/product/${page}/${pageSize}`,
    method: 'get'

  })
}
// 获取无人船列表
export function getDeviceList(page, pageSize) {
  return request({
    url: `/admin/xxl/device/${page}/${pageSize}`,
    method: 'get'

  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取管理用户分页列表
export function getUserList(page, pageSize) {
  return request({
    url: `/admin/xxl/user/${page}/${pageSize}`,
    method: 'get'
  })
}
// 新增用户
export function addUser(data) {
  return request({
    url: '/admin/xxl/user/save',
    method: 'post',
    data
  })
}
// 删除管理用户
export function removeUser(id) {
  return request({
    url: `/admin/xxl/user/remove/${id}`,
    method: 'delete'

  })
}
// 修改管理用户
export function updataUser() {
  return request({
    url: `/admin/xxl/user/updata`,
    method: 'put'
  })
}

// 根据用户获取角色数据
export function userToRole(userId) {
  return request({
    url: `/admin/xxl/user/toAssign/${userId}`,
    method: 'get'
  })
}
// 用户添加角色
export function userAddRole(roleId, userId) {
  return request({
    url: `/admin/xxl/user/doAssign`,
    method: 'post',
    params: {
      roleId,
      userId
    }

  })
}

