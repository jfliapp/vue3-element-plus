import request from '@/utils/request'

// 商品 -列表
export function listUser(data) {
    return request({
        url: '/boss/mall/group/list/user',
        method: 'post',
        data
    })
}