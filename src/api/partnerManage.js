import request from '@/utils/request'

// 商品 -列表
export function getPartnerList(data) {
    return request({
        url: '/boss/partner/list',
        method: 'post',
        data
    })
}

// 银行列表
export function bankList(data) {
    return request({
        url: '/boss/partner/bankList',
        method: 'post',
        data
    })
}
// 新增供应商商
export function addPartner(data) {
    return request({
        url: '/boss/partner/save',
        method: 'post',
        data
    })
}
// 查询供应商信息
export function searchPartnerDetail(data) {
    return request({
        url: '/boss/partner/detail',
        method: 'post',
        data
    })
}

// 查询省
export function searchProvince() {
    return request({
        url: '/boss/area/province',
        method: 'get',
    })
}

// 查询市区
export function searchCity(data) {
    return request({
        url: `/boss/area/city/?provinceCode=${data}`,
        method: 'get',
    })
}
// 删除
export function delPartner(data) {
    return request({
        url: '/boss/partner/del',
        method: 'post',
        data
    })
}

// 查询合作商关联的商品
export function getPartnerGoodsList(data) {
    return request({
        url: '/boss/partner/goodsList',
        method: 'post',
        data
    })
}
