<script setup lang="ts">
import { getJournalListApi } from '@/api/moneyManagement'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType, tableFieldsType } from '../AccountManagement/types'
import { ElPopover, ElScrollbar, ElButton } from 'element-plus'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'

// import { reactive } from 'vue'

const { t } = useI18n()
const { push } = useRouter()
const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getJournalListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount'
  }
})

methods.getList()

const tableColumns: TableColumn[] = [
  {
    field: 'index',
    type: 'index',
    label: '序号'
  },
  {
    field: 'TraderId',
    label: '交易商ID'
  },
  {
    prop: 'NickName',
    field: 'NickName',
    label: '真实姓名'
  },
  {
    prop: 'Owner',
    field: 'Owner',
    label: '交易账号'
  },
  {
    prop: 'UplineDirect',
    field: 'UplineDirect',
    label: '所属机构'
  },
  {
    prop: 'OwnerType',
    field: 'OwnerType',
    label: '交易品种'
  },
  {
    prop: 'OwnerType',
    field: 'OwnerType',
    label: '交易品种'
  },
  {
    prop: 'PayChannel',
    field: 'PayChannel',
    label: '交易类型'
  },
  {
    prop: 'CurCode',
    field: 'CurCode',
    label: '委托时间'
  },
  {
    prop: 'Amt',
    field: 'Amt',
    label: '委托价格'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '委托价格'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '委托数量'
  },
  {
    prop: 'PayChannel',
    field: 'PayChannel',
    label: '止盈'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '止损'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '最新价格'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '有效时间'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '是否自动递延'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '是否自动追加保证金'
  },
  {
    field: 'action',
    width: '260px',
    label: t('tableDemo.action'),
    form: {
      show: false
    },
    detail: {
      show: false
    }
  }
]
const searchParams: tableFieldsType[] = [
  {
    field: 'partnerterm',
    value: '',
    prop: 'partnerterm',
    label: '所属机构',
    component: 'Input'
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '包含下级',
    component: 'Select',
    value: [],
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ]
    }
  },
  {
    field: 'euterm',
    value: '',
    prop: 'euterm',
    label: '关键字',
    labelWidth: 0,
    component: 'Input'
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '用户状态',
    component: 'Select',
    value: [],
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ]
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '在线状态',
    component: 'Select',
    value: [],
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ]
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '实名认证状态',
    component: 'Select',
    value: [],
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ]
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '是否对冲',
    component: 'Select',
    value: [],
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ]
    }
  },
  {
    field: 'selectall',
    prop: 'selectall',
    label: '国家',
    component: 'Select',
    value: [],
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ]
    }
  },
  {
    field: 'date',
    value: '',
    prop: 'date',
    label: '查询时间',
    rangeSeparator: 'To',
    component: 'DatePicker',
    componentProps: {
      type: 'daterange'
    }
  }
]
const tradersList = [
  { name: '用户详情', url: '/accountManagement/detailUsers' },
  { name: '钱包资产', url: '/accountManagement/walletAsset' },
  { name: '出入金记录', url: '/accountManagement/cashRecord' },
  { name: '资金流水', url: '/accountManagement/moneyFlow' },
  { name: '区块链轮询', url: '/accountManagement/moneyFlow' },
  { name: 'OTC广告', url: '/accountManagement/moneyFlow' },
  { name: 'OTC订单', url: '/accountManagement/moneyFlow' },
  { name: '广告历史', url: '/accountManagement/moneyFlow' },
  { name: 'CFD持仓单', url: '/accountManagement/moneyFlow' },
  { name: 'CFD平仓单', url: '/accountManagement/moneyFlow' },
  { name: 'CFD委托单', url: '/accountManagement/moneyFlow' },
  { name: '币币挂单', url: '/accountManagement/moneyFlow' },
  { name: '币币成交单', url: '/accountManagement/moneyFlow' },
  { name: '币币挂单历史', url: '/accountManagement/moneyFlow' }
]
const goUrl = (item, url) => {
  push(`${url}?id=${item.id}`)
}
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :schema="searchParams"
      :showReset="false"
      @search="methods.setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #TraderId="scope">
        <div>
          <ElPopover effect="light" trigger="click" placement="right" width="auto">
            <template #default>
              <ElScrollbar always :height="240">
                <div class="flex flex-col">
                  <div
                    class="flex justify-between align-middle p-1 cursor-pointer pr-3"
                    v-for="(item, idx) in tradersList"
                    :key="idx"
                    @click="goUrl(scope.row, item.url)"
                  >
                    <span>
                      {{ item.name }}
                    </span>
                    <Icon
                      icon="ep:warning"
                      color="var(--el-color-primary)"
                      class="ml-2px relative top-1px"
                    />
                  </div>
                </div>
              </ElScrollbar>
            </template>
            <template #reference>
              <div class="text-blue-500 cursor-pointer">
                <Icon
                  icon="ep:warning"
                  color="var(--el-color-primary)"
                  class="ml-2px relative top-1px"
                />
                {{ scope.row.UplineDirect }}
              </div>
            </template>
          </ElPopover>
        </div>
      </template>
      <template #action="{ row }">
        <ElButton type="primary"> {{ t('exampleDemo.edit') }}{{ row.index }} </ElButton>
        <ElButton type="success">
          {{ t('exampleDemo.detail') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
