import request from '@/utils/request'

export function getDetectData(deviceId, mapId) {
  return request({
    url: '/admin/xxl/data/getData',
    method: 'get',
    params: {
      deviceId,
      mapId
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
