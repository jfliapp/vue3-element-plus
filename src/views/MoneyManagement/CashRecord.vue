<script setup lang="ts">
import { getCashinoutListApi } from '@/api/schedule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType } from './types'
import { cashRecordSearchParams, cashRecordTableColumns } from './const'
import { exportExcel } from '@/utils/export'
import { ElDialog, ElButton } from 'element-plus'
// import { useI18n } from '@/hooks/web/useI18n'

import { ref } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getCashinoutListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    otherList: 'statistics',
    total: 'listcount'
  }
})

methods.getList()
// const CashType: Options[] = [
//   {
//     value: -1,
//     label: '全部'
//   },
//   {
//     value: 2,
//     label: '入金'
//   },
//   {
//     value: 3,
//     label: '出金'
//   }
// ]
const sumColumns: TableColumn[] = [
  {
    prop: 'CurCode',
    field: 'CurCode',
    label: '币种'
  },
  {
    prop: 'InAmt',
    field: 'InAmt',
    label: '入金'
  },
  {
    prop: 'OutAmt',
    field: 'OutAmt',
    label: '出金'
  },
  {
    prop: 'InFeeTotal',
    field: 'InFeeTotal',
    label: '入金手续费'
  },
  {
    prop: 'OutFeeTotal',
    field: 'OutFeeTotal',
    label: '出金手续费'
  },
  {
    prop: 'BlockchainFeeTotal',
    field: 'BlockchainFeeTotal',
    label: '链上手续费'
  }
]

const fieldHns = [
  {
    name: 'partnertype',
    fn: function (v) {
      let map = new Map()
      map.set('__a', { partnertype: '' })
      map.set('__b', { central: true })
      map.set('__c', { bizauthconnect: true })
      map.set('__d', { partnertype: 0 })
      map.set('__e', { partnertype: 1 })
      map.set('__f', { partnertype: 1, marketmaking: 2 })
      map.set('__g', { partnertype: 2 })

      return map.get(v)
    }
  }
]

const dialogVisible = ref(false)
const sumHn = () => {
  dialogVisible.value = true
}
const getExcel = () => {
  exportExcel(tableObject.tableList, cashRecordTableColumns)
}
</script>
<template>
  <ElDialog v-model="dialogVisible" title="汇总" width="30%">
    <div>
      <Table :columns="sumColumns" :data="tableObject.otherTableList" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="dialogVisible = false">Cancel</ElButton>
      </span>
    </template>
  </ElDialog>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :schema="cashRecordSearchParams"
      :showExportExcel="true"
      :showSum="true"
      :field-hn="fieldHns"
      @sum-hn="sumHn"
      @export-excel="getExcel"
      @search="methods.setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="cashRecordTableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
