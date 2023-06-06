// import { Layout, getParentLayout } from '@/utils/routerHelper'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

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
        component: () => import('@/views/schedule/scheduleAudit.vue'),
        meta: {
          title: '注册审核'
        }
      },
      {
        path: 'accessAudit',
        name: 'RccessAudit',
        component: () => import('@/views/schedule/accessAudit.vue'),
        meta: {
          title: '出入金审核'
        }
      },
      {
        path: 'confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('@/views/schedule/confirmOrder.vue'),
        meta: {
          title: '配资待确认订单'
        }
      },

      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/Level/Menu2.vue'),
        meta: {
          title: t('router.menu2')
        }
      }
    ]
  }
]
