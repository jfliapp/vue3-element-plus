<script setup lang="ts">
import { getTradeTicketsListApi } from '@/api/schedule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { exportExcel } from '@/utils/export'
import { tableDataFieldType, tableFieldsType } from './types'
// import { useI18n } from '@/hooks/web/useI18n'

// import { reactive } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getTradeTicketsListApi,
  // delListApi: delTableListApi,
  defaultParams: {
    trademode: 2,
    status: 5
  },
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
    field: 'id',
    prop: 'id',
    label: '委托单ID'
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
    label: '委托数量',
    formatter: (item) => {
      if (item.Status === 5) return '6'
      return item.Status
    }
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
    prop: 'createdat',
    field: 'createdat',
    label: '操作'
  }
]
const searchParams: tableFieldsType[] = [
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '数据',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '模拟',
          value: 0
        },
        {
          label: '真实',
          value: 1
        }
      ]
    }
  },
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
    componentProps: {
      options: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: '1'
        }
      ]
    }
  },
  {
    field: 'euterm',
    value: '',
    prop: 'euterm',
    label: '用户Id',
    labelWidth: 0,
    component: 'Input'
  },
  {
    field: 'term1',
    value: '',
    prop: 'term',
    label: '交易账户',
    component: 'Input'
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '订单ID',
    component: 'Input'
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '交易类型',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '1',
          value: 1
        }
      ]
    }
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: 'IP查询',
    component: 'Input'
  }
]
const getExcel = () => {
  exportExcel(tableObject.tableList, tableColumns)
}
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :show-export-excel="true"
      :schema="searchParams"
      @search="methods.setSearchParams"
      @export-excel="getExcel"
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
    />
  </ContentWrap>
</template>
