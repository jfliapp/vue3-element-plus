import request from '@/utils/request'

// 商品 -列表
export function refundList(data) {
    return request({
        url: '/boss/mall/order/refundList',
        method: 'post',
        data
    })
}

// 商品 -详情
export function refundDetail(data) {
    return request({
        url: '/boss/mall/order/refundDetail',
        method: 'post',
        data
    })
}

// 申请退货管理-同意退款-不同意退款
export function refundCheck(data) {
    return request({
        url: '/boss/mall/order/refundCheck',
        method: 'post',
        data
    })
}

// 申请退货管理-同意退款-不同意退款
export function refundConfirmReceiving(data) {
    return request({
        url: '/boss/mall/order/refundConfirmReceiving',
        method: 'post',
        data
    })
}


//自营商品发货管理-列表
export function shippingList(data) {
    return request({
        url: '/boss/mall/order/shippingList',
        method: 'post',
        data
    })
}

//自营商品发货管理-确定收货
export function confirmReceiving(data) {
    return request({
        url: '/boss/mall/order/confirmReceiving',
        method: 'post',
        data
    })
}

//自营商品发货管理-发货
export function shippingGoods(data) {
    return request({
        url: '/boss/mall/order/shippingGoods',
        method: 'post',
        data
    })
}


//自营商品发货管理-物流单号填写
export function updateGoodsTrackingNumber(data) {
    return request({
        url: '/boss/mall/order/updateGoodsTrackingNumber',
        method: 'post',
        data
    })
}

//拼团合约管理-列表
export function listMallGroupBoss(data) {
    return request({
        url: '/boss/mall/order/listMallGroupBoss',
        method: 'post',
        data
    })
}

//拼团合约管理-详情
export function mallGroupDetail(data) {
    return request({
        url: '/boss/mall/order/mallGroupDetail',
        method: 'post',
        data
    })
}

//转卖合约管理-列表
export function resaleList(data) {
    return request({
        url: '/boss/mall/order/resaleList',
        method: 'post',
        data
    })
}
//转卖合约管理-详情
export function resaleDetail(data) {
    return request({
        url: '/boss/mall/order/detail',
        method: 'post',
        data
    })
}

// 自营商品发货管理-导出
export function shippingListExport(data) {
    return request({
        url: '/boss/mall/order/shippingListExport',
        method: 'post',
        data,
        responseType: 'arraybuffer'
    })
}

// 自营商品发货管理-导出
export function orderdownload(data) {
    return request({
        url: '/boss/logistics/order/download',
        method: 'get',
        responseType: 'arraybuffer'
    })
}

// 拼团合约管理-导出
export function exportMallGroupBoss(data) {
    return request({
        url: '/boss/mall/order/exportMallGroupBoss',
        method: 'post',
        data,
        responseType: 'arraybuffer'
    })
}

// 自营商品发货管理-批量发货
export function batchShippingGoods(data) {
    return request({
        url: '/boss/mall/order/batchShippingGoods',
        method: 'post',
        data
    })
}

// 自营商品发货管理-批量发货
export function partnerBatchShippingGoods(data) {
    return request({
        url: '/boss/mall/order/partnerBatchShippingGoods',
        method: 'post',
        data
    })
}

// 自营商品发货管理-批量发货
export function getOrderExpressInfo(data) {
    return request({
        url: '/boss/mall/order/getOrderExpressInfo',
        method: 'post',
        data
    })
}

// 自营商品发货管理-商家已发货
export function partnerShippingGoods(data) {
    return request({
        url: '/boss/mall/order/partnerShippingGoods',
        method: 'post',
        data
    })
}

export function shippingStatusCount(data) {
    return request({
        url: '/boss/mall/order/shippingStatusCount',
        method: 'get'
    })
}

export function getMallGroupOrderCnt(data) {
    return request({
        url: '/boss/mall/order/getMallGroupOrderCnt',
        method: 'get'
    })
}

// 1+2拼合约管理-列表
export function listOneTwoGroupBoss(data) {
    return request({
        url: '/boss/mall/order/listOneTwoGroupBoss',
        method: 'post',
        data
    })
}

//1+2拼合约管理-标签数据统计
export function getOneTwoGroupOrderCnt(data) {
    return request({
        url: '/boss/mall/order/getOneTwoGroupOrderCnt',
        method: 'get'
    })
}

//1+2拼合约管理-导出
export function exportOneTwoGroupBoss(data) {
    return request({
        url: '/boss/mall/order/exportOneTwoGroupBoss',
        method: 'post',
        data,
        responseType: 'arraybuffer'
    })
}


// 1+2拼合约管理-详情
export function oneTwoGroupDetail(data) {
    return request({
        url: '/boss/mall/order/oneTwoGroupDetail',
        method: 'post',
        data
    })
}





