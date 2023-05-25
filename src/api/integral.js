import request from '@/utils/request'

// 积分转换管理-列表
export function transferPointsList(data) {
  return request({
    url: '/boss/mall/reward/transfer/points/list',
    method: 'post',
    data
  })
}
