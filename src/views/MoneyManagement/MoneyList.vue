<script setup lang="ts">
import { getCapitalMonitorListApi } from '@/api/moneyManagement'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType } from './types'
import { getDate } from '@/utils/date'
import { moneyListSearchParams, moneyListColumns } from './const'
// import { useI18n } from '@/hooks/web/useI18n'

// import { reactive } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getCapitalMonitorListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount',
    formatter: (list, obj) => {
      let x: any[] = []
      list.forEach((item) => {
        let arr = item.Accts
        arr.forEach((li, i) => {
          let temp = { ...li }
          if (i === 0) {
            temp = { ...temp, ...item }
            temp.len = arr.length
          }
          x.push(temp)
        })
      })
      x.push({ ...obj, OwnerCaption: '总计', len: 1 })
      return x
    }
  }
})

methods.getList()

const fieldHn = [
  {
    name: 'date',
    fn: (item) => {
      return { begintm: getDate(item[0]), endtm: getDate(item[1]) }
    }
  }
]
const spanMethod = ({ row, columnIndex }) => {
  let columns = [0, 1, 2, 3]
  if (columns.includes(columnIndex)) {
    if (row.len) {
      return {
        rowspan: row.len,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }
}
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :schema="moneyListSearchParams"
      :fieldHn="fieldHn"
      @search="methods.setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :span-method="spanMethod"
      :columns="moneyListColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      height="500"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
