import request from '@/utils/request'

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


export function getMapList(mapId) {
  return request({
    url: '/admin/xxl/map/list',
    method: 'get',
    params: { mapId }

  })
}


export function getMapListShow(deviceId) {
  return request({
    url: '/admin/xxl/map/list',
    method: 'get',
    params: { deviceId }

  })
}
