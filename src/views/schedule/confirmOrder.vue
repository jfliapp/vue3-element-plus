<script setup lang="ts">
import { getTradeTicketsListApi } from '@/api/schdule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType, tableFieldsType } from './types'
import { ElCheckbox } from 'element-plus'
// import { useI18n } from '@/hooks/web/useI18n'

// import { reactive } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getTradeTicketsListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount'
  }
})

methods.getList()

const tableColumns: tableFieldsType[] = [
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
  }
]
const searchParams: tableFieldsType[] = [
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '用户类型',
    component: 'Select'
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
    label: '',
    labelWidth: 0,
    component: 'Checkbox',
    value: [],
    componentProps: {
      options: [
        {
          label: '包含下级',
          value: '1'
        }
      ]
    }
  },
  {
    field: 'euterm',
    value: '',
    prop: 'euterm',
    label: '',
    labelWidth: 0,
    component: 'Input'
  },
  {
    field: 'term1',
    value: '',
    prop: 'term',
    label: '出入金通道',
    component: 'Select'
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '出入金类型',
    component: 'Select'
  },
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '币种',
    component: 'Input'
  },
  {
    field: 'date',
    value: '',
    prop: 'date',
    label: '',
    rangeSeparator: 'To',
    type: 'daterange',
    component: 'DatePicker'
  }
]
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :is-custom="true"
      :showReset="false"
      :schema="searchParams"
      @search="methods.setSearchParams"
    >
      <template #default>
        <ElCheckbox name="selectall">下级通知</ElCheckbox>
      </template>
    </Search>

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
