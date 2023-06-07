<script setup lang="ts">
import { getCashinoutListApi } from '@/api/schdule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType, tableFieldsType } from './types'
import { getDate } from '@/utils/date'
// import { useI18n } from '@/hooks/web/useI18n'

// import { reactive } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getCashinoutListApi,
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
    field: 'id',
    prop: 'id',
    label: '订单ID'
  },
  {
    prop: 'NickName',
    field: 'NickName',
    label: 'ID/名称'
  },
  {
    prop: 'Owner',
    field: 'Owner',
    label: '真实姓名'
  },
  {
    prop: 'UplineDirect',
    field: 'UplineDirect',
    label: '所属机构'
  },
  {
    prop: 'OwnerType',
    field: 'OwnerType',
    label: '类型'
  },
  {
    prop: 'PayChannel',
    field: 'PayChannel',
    label: '支付通道'
  },
  {
    prop: 'CurCode',
    field: 'CurCode',
    label: '币种'
  },
  {
    prop: 'Amt',
    field: 'Amt',
    label: '金额'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '支付币种'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '提币地址'
  },
  {
    prop: 'PayChannel',
    field: 'PayChannel',
    label: '支付方式'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '对公账户开户行'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '用户银行开户行'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '账号'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '姓名'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '支行'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '凭证'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '状态'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '申请时间'
  },
  {
    prop: 'Desc',
    field: 'Desc',
    label: '备注'
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
    label: '是否包含下级',
    labelWidth: 0,
    component: 'Select',
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
    label: '机构ID',
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
    label: '查询时间',
    rangeSeparator: 'To',
    component: 'DatePicker',
    componentProps: {
      type: 'daterange'
    }
  }
]
const fieldHn = [
  {
    name: 'date',
    fn: (item) => {
      return { begintm: getDate(item[0]), endtm: getDate(item[1]) }
    }
  }
]
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :schema="searchParams"
      :fieldHn="fieldHn"
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
    />
  </ContentWrap>
</template>
