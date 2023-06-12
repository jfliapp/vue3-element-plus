import { useAxios } from '@/hooks/web/useAxios'
// import type { MenuListType } from './types'

const request = useAxios()
// 平台账面资金
export const getPlatformBookAssertApi = () => {
  return request.post({
    url: '/admin/platform_book_assert_rf'
  })
}
// 重要钱包资金
export const getCentralWalletAssertApi = () => {
  return request.post({
    url: '/admin/central_wallet_assert_rf'
  })
}

// 钱包资金
export const getAcctsetListApi = (data: any) => {
  return request.post({
    url: '/admin/acctset_list',
    data
  })
}

// 资金列表
export const getCapitalMonitorListApi = (data: any) => {
  return request.post({
    url: '/admin/capital_monitor',
    data
  })
}

// 红冲蓝补
export const getCashAcctInfoApi = (data: any) => {
  return request.post({
    url: '/admin/cashacct_info',
    data
  })
}

export const getStaffAdjustAcctApi = (data: any) => {
  return request.post({
    url: '/admin/staff_adjustacct',
    data
  })
}

// 资金流水
export const getJournalListApi = (data: any) => {
  return request.post({
    url: '/admin/journal_list',
    data
  })
}
