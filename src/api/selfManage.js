import request from '@/utils/request'

// 商品 -列表
export function groupExchangeList(data) {
    return request({
        url: '/boss/goods/groupExchangeList',
        method: 'post',
        data
    })
}


export function groupExchangeOpt(data) {
    return request({
        url: '/boss/goods/groupExchangeOpt',
        method: 'post',
        data
    })
}

//秒杀活动-列表
export function Activitylist(data) {
    return request({
        url: '/boss/secKill/activity/list',
        method: 'post',
        data
    })
}

//秒杀活动-新增
export function ActivityAdd(data) {
    return request({
        url: '/boss/secKill/activity/add',
        method: 'post',
        data
    })
}

//秒杀活动-详情
export function Activitydetail(data) {
    return request({
        url: '/boss/secKill/activity/detail',
        method: 'post',
        data
    })
}

//秒杀活动-修改
export function Activityedit(data) {
    return request({
        url: '/boss/secKill/activity/edit',
        method: 'post',
        data
    })
}

//发布1+2拼分页查询
export function oneTwolist(data) {
    return request({
        url: '/boss/mall/oneTwo/list',
        method: 'post',
        data
    })
}
//创建发布1+2拼
export function oneTwocreate(data) {
    return request({
        url: '/boss/mall/oneTwo/create',
        method: 'post',
        data
    })
}
// 数据统计-用户交易记录查询
export function queryUserOrderRecordList(data) {
    return request({
        url: '/boss/mall/statistics/queryUserOrderRecordList',
        method: 'post',
        data
    })
}

//数据统计-用户交易记录查询-标签数据统计
export function getUserOrderRecordCnt(data) {
    return request({
        url: '/boss/mall/statistics/getUserOrderRecordCnt',
        method: 'get',
    })
}


// 抵扣价格-查询TP
export function findTpPrice(data) {
    return request({
        url: '/boss/deduction/findTpPrice',
        method: 'post',
        data
    })
}

// 抵扣价格-查询TP
export function installTpPrice(data) {
    return request({
        url: '/boss/deduction/installTpPrice',
        method: 'post',
        data
    })
}

// 代金券-奖励发放规则查询
export function findRewardRule(data) {
    return request({
        url: '/boss/cash/coupon/findRewardRule',
        method: 'post',
        data
    })
}

// 代金券-奖励发放规则查询
export function installRewardRule(data) {
    return request({
        url: '/boss/cash/coupon/installRewardRule',
        method: 'post',
        data
    })
}

//TP奖励通缩参数配置查询
export function tpquery(data) {
    return request({
        url: '/boss/reward/config/tp/query',
        method: 'get',
    })
}


//TP奖励通缩参数配置查询
export function tpSave(data) {
    return request({
        url: '/boss/reward/config/tp/save',
        method: 'post',
        data
    })
}
