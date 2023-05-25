import request from '@/utils/request'

// 商品 -列表
export function categoryList(data) {
    return request({
        url: '/boss/goods/category/list',
        method: 'post',
        data
    })
}