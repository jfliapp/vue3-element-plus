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
//获取城市列表
export const getCountry = (data: any) => {
  return request.post({
    url: '/admin/country',
    data
  })
}
