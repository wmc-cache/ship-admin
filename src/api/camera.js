import request from '@/utils/request'

// 获取摄像头列表
export function getCameraList(page, pageSize) {
  return request({
    url: `/admin/xxl/device/${page}/${pageSize}`,
    method: 'get'

  })
}

