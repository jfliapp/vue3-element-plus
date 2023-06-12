<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import DetailTable from './components/DetailTable.vue'
import { onMounted, reactive, ref } from 'vue'
import { ElRow, ElCol, ElTabs, ElTabPane } from 'element-plus'
import {
  moneyColumns,
  platformWalletColumns,
  CFDColumns,
  optionsColumns,
  bounsColumns,
  centralPlatformColumns,
  centralWalletColumns
} from './const'
import { getPlatformBookAssertApi, getCentralWalletAssertApi } from '@/api/moneyManagement'

const activeName = ref('platformTab')
let platformData = reactive({
  wallet_summary: [],
  wallet_central: [],
  wallet: [],
  cfd: [],
  option: [],
  bouns: []
})
let centralData = reactive({
  wallet_summary: [],
  central_summary: [],
  platform_summary: []
})

onMounted(async () => {
  const { data } = await getPlatformBookAssertApi()
  platFormSortData(data)
})

function platFormSortData(data) {
  platformData.wallet_summary = data.wallet_summary
  platformData.wallet_central = data.wallet_central
  const walletData = data.wallet.reduce((prev, item) => {
    if (item.data.length > 0) {
      item.data.forEach((li, i) => {
        let t = { ...li, len: i === 0 && item.data.length }
        t.role = item.role
        prev.push(t)
      })
    }
    return prev
  }, [])
  platformData.wallet = walletData
  platformData.cfd = data.cfd
}
function centralSortData(data) {
  centralData.platform_summary = data.platform_summary
  centralData.central_summary = data.central_summary
  const walletData = data.wallet_summary.reduce((prev, item) => {
    if (item.data.length > 0) {
      item.data.forEach((li, i) => {
        let t = { ...li, len: i === 0 && item.data.length }
        t.role = item.role
        prev.push(t)
      })
    }
    return prev
  }, [])
  centralData.wallet_summary = walletData
}

const tabHn = async (name) => {
  if (name === 'platformTab') {
    const { data } = await getPlatformBookAssertApi()
    platFormSortData(data)
  } else {
    const { data } = await getCentralWalletAssertApi()
    centralSortData(data)
  }
}

const moneySpanMethod = ({ row, columnIndex }) => {
  if (columnIndex === 0) {
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
    <ElTabs v-model="activeName" @tab-change="tabHn">
      <ElTabPane label="平台账面资金" name="platformTab">
        <ElRow :gutter="20">
          <ElCol :span="12">
            <DetailTable
              title="平台总资金"
              :columns="moneyColumns"
              :data="platformData.wallet_summary"
            />
          </ElCol>
          <ElCol :span="12">
            <DetailTable
              title="中央账户"
              :columns="moneyColumns"
              :data="platformData.wallet_central"
            />
          </ElCol>
        </ElRow>
        <DetailTable
          title="钱包资产"
          :span-method="moneySpanMethod"
          :columns="platformWalletColumns"
          :data="platformData.wallet"
        />
        <DetailTable title="CFD账户" :columns="CFDColumns" :data="platformData.cfd" />
        <DetailTable title="期权账户" :columns="optionsColumns" :data="platformData.option" />
        <DetailTable title="奖励账户" :columns="bounsColumns" :data="platformData.bouns" />
      </ElTabPane>
      <ElTabPane label="中央钱包资产" name="moneyTab">
        <DetailTable
          title="平台总资产"
          :columns="centralPlatformColumns"
          :data="centralData.platform_summary"
        />
        <DetailTable
          title="中央账户"
          :columns="centralPlatformColumns"
          :data="centralData.central_summary"
        />
        <DetailTable
          title="钱包账户"
          :span-method="moneySpanMethod"
          :columns="centralWalletColumns"
          :data="centralData.wallet_summary"
        />
      </ElTabPane>
    </ElTabs>
  </ContentWrap>
</template>
<style lang="less">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
