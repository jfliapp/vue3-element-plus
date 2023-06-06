import { useAxios } from '@/hooks/web/useAxios'
// import type { MenuListType } from './types'

const request = useAxios()
// 注册审核
export const getSchduleEnduserListApi = (data: any) => {
  return request.post({
    url: '/admin/enduser_list',
    data
  })
}
// 出入金审核
export const getCashinoutListApi = (data: any) => {
  return request.post({
    url: '/admin/cashinoutlist',
    data
  })
}

export const getTradeTicketsListApi = (data: any) => {
  return request.post({
    url: '/admin/trade_tickets',
    data
  })
}
