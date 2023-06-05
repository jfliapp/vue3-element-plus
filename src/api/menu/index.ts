import { useAxios } from '@/hooks/web/useAxios'
// import type { MenuListType } from './types'

const request = useAxios()

export const getRoleMenuListApi = (data: any) => {
  return request.post({
    url: '/admin/sys_menuitem',
    data
  })
}
