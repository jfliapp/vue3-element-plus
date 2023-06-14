<script setup lang="ts">
import { getCapitalMonitorListApi } from '@/api/moneyManagement'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType } from './types'
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
      :field-hn="fieldHns"
      :schema="moneyListSearchParams"
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
