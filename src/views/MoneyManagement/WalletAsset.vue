<script setup lang="ts">
import { getAcctsetListApi } from '@/api/moneyManagement'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType } from './types'
import { walletSearchParams, walletColumns } from './const'
// import { useI18n } from '@/hooks/web/useI18n'

// import { reactive } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getAcctsetListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount',
    formatter: (list) => {
      let x = list.map((item) => {
        let temp = { ...item }
        if (item.Sacs.length > 0) {
          item.Sacs.forEach((li, i) => {
            if (i === 0) {
              temp = { ...li, ...temp, children: [] }
              temp.__subId = temp.id
            } else {
              li.__subId = li.id
              temp.children.push(li)
            }
          })
        }
        return temp
      })
      return x
    }
  }
})

methods.getList()
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :schema="walletSearchParams"
      @search="methods.setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      row-key="__subId"
      :columns="walletColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
