<script setup lang="ts">
import { getTradeTicketsListApi } from '@/api/schedule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { exportExcel } from '@/utils/export'
import { tableDataFieldType } from './types'
import { confirmSearchParams, confirmTableColumns } from './const'
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

const getExcel = () => {
  exportExcel(tableObject.tableList, confirmTableColumns)
}
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :show-export-excel="true"
      :schema="confirmSearchParams"
      @search="methods.setSearchParams"
      @export-excel="getExcel"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="confirmTableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
