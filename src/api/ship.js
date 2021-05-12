import request from '@/utils/request'
// 获取水质探测数据
export function getDetectData(deviceId, mapId, startTime, endTime) {
  return request({
    url: '/admin/xxl/data/getData',
    method: 'get',
    params: {
      deviceId,
      mapId,
      startTime,
      endTime
    }
  })
}

// 获取地图列表
export function getMapList(mapId) {
  return request({
    url: '/admin/xxl/map/list',
    method: 'get',
    params: { mapId }

  })
}

// 无人船
export function editDevice(data) {
  return request({
    url: `/admin/xxl/device/updata`,
    method: 'post',
    data

  })
}


export function getMapListShow(deviceId, page, pageSize) {
  return request({
    url: `/admin/xxl/map/list/${page}/${pageSize}`,
    method: 'get',
    params: { deviceId }

  })
}
// 修改湖名
export function postMapName(mapId, name) {
  return request({
    url: '/admin/xxl/map/updata',
    method: 'post',
    params: { mapId, name }

  })
}
