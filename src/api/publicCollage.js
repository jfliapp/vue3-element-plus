import request from '@/utils/request'

// 商品 -列表
export function groupList(data) {
    return request({
        url: '/boss/mall/group/list',
        method: 'post',
        data
    })
}

// 商品 -列表
export function groupTypeList(data) {
    return request({
        url: '/boss/mall/group/type/list',
        method: 'get',
    })
}

//创建新拼团
export function groupCreate(data) {
    return request({
        url: '/boss/mall/group/create',
        method: 'post',
        data
    })
}

