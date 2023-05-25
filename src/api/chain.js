import request from '@/utils/request'

// 商品 -列表
export function goodsList(data) {
  return request({
    url: '/boss/goods/list',
    method: 'post',
    data
  })
}

//商品类别-所有
export function categoryAll(data) {
  return request({
    url: '/boss/goods/category/all',
    method: 'post',
    data
  })
}

//商品类别-所有
export function partnerList(data) {
  return request({
    url: '/boss/goods/partnerList',
    method: 'post',
    data
  })
}

// 商品新增
export function goodsAdd(data) {
  return request({
    url: '/boss/goods/add',
    method: 'post',
    data
  })
}
// 商品上架
export function auditUp(data) {
  return request({
    url: '/boss/goods/auditUp',
    method: 'post',
    data
  })
}
// 商品下架
export function auditDown(data) {
  return request({
    url: '/boss/goods/auditDown',
    method: 'post',
    data
  })
}
// 商品详情
export function goodsdetail(data) {
  return request({
    url: '/boss/goods/detail',
    method: 'post',
    data
  })
}
// 商品修改
export function goodsEdit(data) {
  return request({
    url: '/boss/goods/edit',
    method: 'post',
    data
  })
}
// 修改库存
export function editStock(data) {
  return request({
    url: '/boss/goods/editStock',
    method: 'post',
    data
  })
}

// 合约列表
export function getContracts(data) {
  return request({
    url: '/boss/mall/order/list',
    method: 'post',
    data
  })
}

// 合约详情
export function getContractDetail(data) {
  return request({
    url: '/boss/mall/order/detail',
    method: 'post',
    data
  })
}

// 佣金列表
export function getCommissionList(data) {
  return request({
    url: '/boss/commission/list',
    method: 'post',
    data
  })
}

// 合约详情
export function getCommissionDetail(data) {
  return request({
    url: '/boss/commission/detail',
    method: 'post',
    data
  })
}

// 订单状态变更
export function refundApply(data) {
  return request({
    url: '/boss/mall/order/refundApply',
    method: 'post',
    data
  })
}

// 导出订单
export function exportExcel(data) {
  return request({
    url: '/boss/mall/order/exportExcelByCondition',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

