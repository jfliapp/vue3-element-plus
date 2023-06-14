<script setup lang="ts">
import { getJournalListApi } from '@/api/moneyManagement'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType } from '../AccountManagement/types'
import { moneyFlowSearchParams, moneyFlowTableColumns } from './const'
// import { Icon } from '@/components/Icon'
// import { useI18n } from '@/hooks/web/useI18n'
// import { useRouter } from 'vue-router'

// import { reactive } from 'vue'

// const { t } = useI18n()
// const { push } = useRouter()
const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getJournalListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount'
  }
})

methods.getList()
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :schema="moneyFlowSearchParams"
      :showReset="false"
      @search="methods.setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="moneyFlowTableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
