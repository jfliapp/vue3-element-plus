import request from '@/utils/request'

// 商品 -列表
export function userList(data) {
    return request({
        url: '/boss/user/list',
        method: 'post',
        data
    })
}

export function getUserDetail(data) {
    return request({
        url: '/boss/user/detail',
        method: 'post',
        data
    })
}

export function getUserCashList(data) {
    return request({
        url: '/boss/user/cashList',
        method: 'post',
        data
    })
}

// 会员积分
export function getUserPointList(data) {
    return request({
        url: '/boss/user/pointList',
        method: 'post',
        data
    })
}

//代金券-发送
export function couponsend(data) {
    return request({
        url: '/boss/cash/coupon/send',
        method: 'post',
        data
    })
}