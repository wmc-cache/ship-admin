import request from '@/utils/request'

export function getRoleList(page, limit) {
  return request({
    url: `/admin/xxl/role/${page}/${limit}`,
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: `/admin/xxl/role/save`,
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/admin/xxl/role/remove/${id}`,
    method: 'delete'

  })
}
// /admin/xxl / permission / toAssign / { roleId }
export function getRolePower(roleId) {
  return request({
    url: `/admin/xxl/permission/toAssign/${roleId}`,
    method: 'get'
  })
}

export function roleAddPower(permissionId, roleId, id) {
  return request({
    url: `/admin/xxl/permission/doAssign`,
    method: 'post',
    params: {
      permissionId, roleId, id

    }
  })
}

