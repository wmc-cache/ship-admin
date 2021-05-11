import request from '@/utils/request'



//获取站点列表
export function getSiteList(page, pageSize) {
  return request({
    url: `/admin/xxl/site/${page}/${pageSize}`,
    method: 'get'

  })
}



//获取传感器列表
export function getSensorList(page, pageSize) {
  return request({
    url: `/admin/xxl/device/${page}/${pageSize}/3`,
    method: 'get'

  })
}

