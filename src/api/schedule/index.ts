import { useAxios } from '@/hooks/web/useAxios'
// import type { MenuListType } from './types'

const request = useAxios()
// 注册审核
export const getScheduleEnduserListApi = (data: any) => {
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

export const ticketsconfimApi = (data: any) => {
  return request.post({
    url: '/admin/ticket_confim',
    data
  })
}
