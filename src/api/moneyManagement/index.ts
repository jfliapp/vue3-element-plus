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
