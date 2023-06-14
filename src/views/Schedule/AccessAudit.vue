<script setup lang="ts">
import { getCashinoutListApi } from '@/api/schedule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType } from './types'
import { accessSearchParams, accessTableColumns } from './const'
import { ElImage } from 'element-plus'
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

const fieldHns = [
  {
    name: 'partnertype',
    fn: function (v) {
      let map = new Map()
      map.set('__a', { bizauthconnect: true })
      map.set('__b', { partnertype: 0 })
      map.set('__c', { partnertype: 1 })
      map.set('__d', { partnertype: 1, marketmaking: 2 })
      map.set('__e', { partnertype: 2 })

      return map.get(v)
    }
  }
]

methods.getList()
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :fieldHn="fieldHns"
      :schema="accessSearchParams"
      @search="methods.setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="accessTableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #LedgerImg="scope">
        <div>
          <ElImage
            style="width: 60px; height: 20px"
            :preview-teleported="true"
            :preview-src-list="[scope.row.LedgerImg]"
            :src="scope.row.LedgerImg"
          >
            <template #error>
              <div class="text-xs text-gray-300"> 加载失败 </div>
            </template>
          </ElImage>
        </div>
      </template>
    </Table>
  </ContentWrap>
</template>
