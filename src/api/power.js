import request from '@/utils/request'


// 获取菜单列表
export function getMenuList() {
  return request({
    url: `/admin/xxl/permission`,
    method: 'get'

  })
}


// 添加菜单
export function AddMenu(data) {
  return request({
    url: `/admin/xxl/permission/save`,
    method: 'post',
    data

  })
}

//修改菜单
export function UpdateMenu() {
  return request({
    url: `/admin/xxl/permission/update`,
    method: 'put'

  })
}

//删除菜单
export function removeMenu(id) {
  return request({
    url: `/admin/xxl/permission/remove/${id}`,
    method: 'delete'

  })
}



//给角色分配权限
export function doAssign() {
  return request({
    url: `/admin/xxl/permission/doAssign`,
    method: 'POST'

  })
}

