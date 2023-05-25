import request from '@/utils/request'

export function searchPointsList(data) {
  return request({
    url: '/boss/mall/reward/points/list',
    method: 'post',
    data
  })
}

export function searchPointsDetail(data) {
    return request({
      url: '/boss/mall/reward/points/detail',
      method: 'post',
      data
    })
  }