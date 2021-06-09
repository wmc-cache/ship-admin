import request from '@/utils/request'
// 获取角色列表
export function getRoleList(page, limit) {
  return request({
    url: `/admin/xxl/role/${page}/${limit}`,
    method: 'get'
  })
}
// 添加角色
export function addRole(data) {
  return request({
    url: `/admin/xxl/role/save`,
    method: 'post',
    data
  })
}
// 删除角色
export function deleteRole(id) {
  return request({
    url: `/admin/xxl/role/remove/${id}`,
    method: 'delete'

  })
}
// 获取角色权限列表
export function getRolePower(roleId) {
  return request({
    url: `/admin/xxl/permission/toAssign/${roleId}`,
    method: 'get'
  })
}
// 给角色添加权限
export function roleAddPower(permissionId, roleId, id) {
  return request({
    url: `/admin/xxl/permission/doAssign`,
    method: 'post',
    params: {
      permissionId, roleId, id

    }
  })
}


// 给角色去掉权限
export function roleDeletePower(permissionId, roleId, id) {
  return request({
    url: `/admin/xxl/permission/doAssign`,
    method: 'post',
    params: {
      permissionId, roleId, id

    }
  })
}


