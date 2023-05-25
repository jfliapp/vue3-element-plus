import request from '@/utils/request'

// 供应商-列表
export function queryBalance(data) {
    return request({
        url: '/boss/financial/queryBalance',
        method: 'post',
        data
    })
}

//根据结算地址查询供应商信息
export function querySupplierByAddress(data) {
    return request({
        url: '/boss/financial/querySupplierByAddress',
        method: 'post',
        data
    })
}

//自营货款管理-结算-提交财务审核
export function createGoodsAmountSettle(data) {
    return request({
        url: '/boss/financial/createGoodsAmountSettle',
        method: 'post',
        data
    })
}

export function selfGoodsAmountList(data) {
    return request({
        url: '/boss/financial/selfGoodsAmountList',
        method: 'post',
        data
    })
}

export function expendAmountList(data) {
    return request({
        url: '/boss/financial/expendAmountList',
        method: 'post',
        data
    })
}

//结算审批管理
export function settleCheckList(data) {
    return request({
        url: '/boss/mall/withdraw/list',
        method: 'post',
        data
    })
}

//结算审批管理-审核
export function settleAudit(data) {
    return request({
        url: '/boss/mall/withdraw/check',
        method: 'post',
        data
    })
}

//收入管理
export function incomeAmountList(data) {
    return request({
        url: '/boss/financial/incomeAmountList',
        method: 'post',
        data
    })
}





