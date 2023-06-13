// import { Layout, getParentLayout } from '@/utils/routerHelper'
import { Layout } from '@/utils/routerHelper'
// import { useI18n } from '@/hooks/web/useI18n'

// const { t } = useI18n()

export const devRoutes: AppRouteRecordRaw[] = [
  {
    path: '/schedule',
    component: Layout,
    redirect: '/schedule/registrationAudit',
    name: 'Schedule',
    meta: {
      title: '待办事项',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'registrationAudit',
        name: 'RegistrationAudit',
        component: () => import('@/views/Schedule/RegistrationAudit.vue'),
        meta: {
          title: '注册审核'
        }
      },
      {
        path: 'accessAudit',
        name: 'RccessAudit',
        component: () => import('@/views/Schedule/AccessAudit.vue'),
        meta: {
          title: '出入金审核'
        }
      },
      {
        path: 'confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('@/views/Schedule/ConfirmOrder.vue'),
        meta: {
          title: '配资待确认订单'
        }
      }
    ]
  },
  {
    path: '/accountManagement',
    component: Layout,
    redirect: '/accountManagement/listUsers',
    name: 'AccountManagement',
    meta: {
      title: '账户管理',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'listUsers',
        name: 'ListUsers',
        component: () => import('@/views/AccountManagement/ListUsers.vue'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'detailUsers',
        name: 'DetailUsers',
        component: () => import('@/views/AccountManagement/DetailUsers.vue'),
        meta: {
          title: '用户列表-用户详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/accountManagement/detailUsers'
        }
      },
      {
        path: 'traders',
        name: 'Traders',
        component: () => import('@/views/AccountManagement/Traders.vue'),
        meta: {
          title: '交易商'
        }
      },
      {
        path: 'detailTraders',
        name: 'DetailTraders',
        component: () => import('@/views/AccountManagement/DetailTraders.vue'),
        meta: {
          title: '交易商-交易商详情',
          noTagsView: true,
          noCache: true,
          hidden: true,
          showMainRoute: true,
          activeMenu: '/accountManagement/detailTraders'
        }
      },
      {
        path: 'bizList',
        name: 'BizList',
        component: () => import('@/views/AccountManagement/BizList.vue'),
        meta: {
          title: '商户列表'
        }
      }
    ]
  },
  {
    path: '/moneyManagement',
    component: Layout,
    redirect: '/moneyManagement/platformAsset',
    name: 'MoneyManagement',
    meta: {
      title: '资产管理',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'platformAsset',
        name: 'PlatformAsset',
        component: () => import('@/views/MoneyManagement/PlatformAsset.vue'),
        meta: {
          title: '平台资产'
        }
      },
      {
        path: 'walletAsset',
        name: 'WalletAsset',
        component: () => import('@/views/MoneyManagement/WalletAsset.vue'),
        meta: {
          title: '钱包资产'
        }
      },
      {
        path: 'moneyList',
        name: 'MoneyList',
        component: () => import('@/views/MoneyManagement/MoneyList.vue'),
        meta: {
          title: '资金列表'
        }
      },
      {
        path: 'redBlueFill',
        name: 'RedBlueFill',
        component: () => import('@/views/MoneyManagement/RedBlueFill.vue'),
        meta: {
          title: '红冲蓝补'
        }
      },
      {
        path: 'cashRecord',
        name: 'CashRecord',
        component: () => import('@/views/MoneyManagement/CashRecord.vue'),
        meta: {
          title: '出入金记录'
        }
      },
      {
        path: 'moneyFlow',
        name: 'MoneyFlow',
        component: () => import('@/views/MoneyManagement/MoneyFlow.vue'),
        meta: {
          title: '资金流水'
        }
      }
    ]
  },
  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/orderManagement/cfdOrder',
    name: 'OrderManagement',
    meta: {
      title: '订单管理',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'cfdOrder',
        name: 'CfdOrder',
        component: () => import('@/views/OrderManagement/CfdOrder.vue'),
        meta: {
          title: 'CFD订单'
        }
      },
      {
        path: 'fundingOrder',
        name: 'FundingOrder',
        component: () => import('@/views/OrderManagement/FundingOrder.vue'),
        meta: {
          title: '配置订单'
        }
      }
    ]
  },
  {
    path: '/reportManagement',
    component: Layout,
    redirect: '/reportManagement/walletStatistical',
    name: 'ReportManagement',
    meta: {
      title: '报表管理',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'walletStatistical',
        name: 'WalletStatistical',
        component: () => import('@/views/ReportManagement/WalletStatistical.vue'),
        meta: {
          title: '钱包账户统计'
        }
      }
    ]
  }
]
