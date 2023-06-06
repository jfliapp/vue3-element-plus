import { useAxios } from '@/hooks/web/useAxios'
// import type { MenuListType } from './types'

const request = useAxios()

export const getSchduleEnduserListApi = (data: any) => {
  return request.post({
    url: '/admin/enduser_list',
    data
  })
}
