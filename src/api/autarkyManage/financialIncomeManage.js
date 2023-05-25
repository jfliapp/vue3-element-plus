import request from '@/utils/request'

export function searchIncomeList(data) {
  return request({
    url: '/boss/mall/income/queryList',
    method: 'post',
    data
  })
}

export function searchIncomeDetail(data) {
    return request({
        url: '/boss/mall/income/queryDetailList',
        method: 'post',
        data
    })
}