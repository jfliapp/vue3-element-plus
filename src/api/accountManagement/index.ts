import { useAxios } from '@/hooks/web/useAxios'
// import type { MenuListType } from './types'

const request = useAxios()
// 交易商
export const getPartnerListApi = (data: any) => {
  return request.post({
    url: '/admin/list_partner',
    data
  })
}
// 商户列表
export const getBizListApi = (data: any) => {
  return request.post({
    url: '/admin/list_biz',
    data
  })
}

export const addBizApi = (data: any) => {
  return request.post({
    url: '/admin/add_biz',
    data
  })
}
// 用户新增
export const signupApi = (data: any) => {
  return request.post({
    url: '/admin/signup',
    data
  })
}
// 用户详情
export const getUserDetailApi = (data: { eu: number }) => {
  return request.post({
    url: '/admin/userdetail',
    data
  })
}

// 基本信息 编辑
export const setEnduserlApi = (data: any) => {
  return request.post({
    url: '/admin/set_enduser',
    data
  })
}

//获取城市列表
export const getCountry = (data: any) => {
  return request.post({
    url: '/admin/country',
    data
  })
}
