import request from '@/utils/request'

// 商品 -列表
export function categoryList(data) {
    return request({
        url: '/boss/goods/category/list',
        method: 'post',
        data
    })
}

// 商品 -添加
export function categoryAdd(data) {
    return request({
        url: '/boss/goods/category/add',
        method: 'post',
        data
    })
}


export function categoryDel(data) {
    return request({
        url: '/boss/goods/category/delete',
        method: 'post',
        data
    })
}

// 商品分类 -修改
export function categoryEdit(data) {
    return request({
        url: '/boss/goods/category/edit',
        method: 'post',
        data
    })
}




