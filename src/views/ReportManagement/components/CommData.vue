<script setup lang="ts">
import { getTradeTicketsListApi } from '@/api/schedule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { exportExcel } from '@/utils/export'
import { tableDataFieldType } from '../types'
import { tabPanes, commonsParams, commonsTableColumns, otherTableColumns } from '../const'
import { ElTabs, ElTabPane, ElProgress } from 'element-plus'
// import { useI18n } from '@/hooks/web/useI18n'

import { ref, defineProps, onDeactivated } from 'vue'

// const { t } = useI18n()

// 定时器
let t: any = null

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getTradeTicketsListApi,
  // delListApi: delTableListApi,
  defaultParams: {
    page: 1,
    size: 50,
    realdemo: 0,
    partnerterm: '',
    selectall: false,
    userterm: '',
    acctid: '',
    tkt: '',
    bs: '',
    status: 2,
    trademode: props.id,
    begintm: '',
    endtm: ''
  },
  response: {
    list: 'list',
    total: 'listcount',
    otherList: 'Statistical'
  }
})

methods.getList()
t = setInterval(() => {
  methods.getList(false)
}, 2000)
onDeactivated(() => {
  clearInterval(t)
})

const tabActive = ref('0')
const flagHoldingSum = ref(false)

const getExcel = () => {
  exportExcel(tableObject.tableList, commonsTableColumns)
}
const getHoldingSum = (flag) => {
  flagHoldingSum.value = flag
}

const tabChange = (item) => {
  if (item !== '0') {
    flagHoldingSum.value = false
  }
  clearInterval(t)
  methods.getList()
  t = setInterval(() => {
    methods.getList(false)
  }, 2000)
}
</script>
<template>
  <ContentWrap>
    <ElTabs v-model="tabActive" @tab-change="tabChange">
      <ElTabPane v-for="item in tabPanes" :key="item.name" :label="item.label" :name="item.name" />
    </ElTabs>

    <Search
      layout="inline"
      :showReset="false"
      :flag="flagHoldingSum"
      :show-export-excel="Number(tabActive) < 5"
      :show-holding-Sum="tabActive === '0'"
      :schema="commonsParams"
      @search="methods.setSearchParams"
      @export-excel="getExcel"
      @holding-sum-hn="getHoldingSum"
    />

    <div v-if="flagHoldingSum" class="mt-10 mb-10">
      <Table :columns="otherTableColumns" :data="tableObject.otherTableList">
        <template #BuyProgress="scope">
          <ElProgress
            :text-inside="true"
            :stroke-width="24"
            :percentage="scope.row.BuyProgress * 100"
            status="success"
          />
        </template>
      </Table>
    </div>

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="commonsTableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
