import request from '@/utils/request'

export function searchCommissionList(data) {
  return request({
    url: '/boss/mall/reward/commission/list',
    method: 'post',
    data
  })
}

export function searchCommissionDetail(data) {
    return request({
      url: '/boss/mall/reward/commission/detail',
      method: 'post',
      data
    })
  }