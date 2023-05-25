import request from '@/utils/request'

// 查询列表
export function searchPartnerSettle(data) {
  return request({
    url: '/boss/mall/partnerSettle/queryPage',
    method: 'post',
    data
  })
}
// 查询详情
export function searchPartnerSettleDetail(data) {
  return request({
    url: '/boss/mall/partnerSettle/queryDetailPage',
    method: 'post',
    data
  })
}
// 审核
export function checkPartnerSettle(data) {
  return request({
    url: '/boss/mall/partnerSettle/check',
    method: 'post',
    data
  })
}
// 结算
export function settlePartnerSettle(data) {
  return request({
    url: '/boss/mall/partnerSettle/settle',
    method: 'post',
    data
  })
}
// 明细列表-调价
export function changeSettleAmount(data) {
  return request({
    url: '/boss/mall/partnerSettle/changeSettleAmount',
    method: 'post',
    data
  })
}
