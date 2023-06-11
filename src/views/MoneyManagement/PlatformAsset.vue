<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import DetailTable from './components/DetailTable.vue'
import { onMounted, reactive, ref } from 'vue'
// import { useRoute } from 'vue-router'
import { ElRow, ElCol, ElTabs, ElTabPane } from 'element-plus'
import { tableColumns1, tableColumns2, tableColumns3, moneyColumns3 } from './const'
// import { getUserDetailApi } from '@/api/accountManagement'
onMounted(async () => {
  // let res = await getUserDetailApi({ eu: Number(query.id) })
  // console.log(res)
})
const activeName = ref('platformTab')

const handleClick = (tab) => {
  console.log(tab)
}
const data1 = reactive([])
const data2 = reactive([])
const data3 = reactive([])

const moneyData = reactive([
  {
    name: '运营中心',
    CurCode: 'TWD',
    Deposit: 0,
    WithDraw: 0,
    Balance: 0
  },
  {
    CurCode: 'USDT',
    Deposit: 0,
    WithDraw: 0,
    Balance: 0
  },
  {
    CurCode: 'USD',
    Deposit: 0,
    WithDraw: 0,
    Balance: 0
  },
  {
    CurCode: 'TWD',
    Deposit: 0,
    WithDraw: 0,
    Balance: 0
  },
  {
    CurCode: 'USDT',
    Deposit: 0,
    WithDraw: 0,
    Balance: 0
  },
  {
    CurCode: 'USD',
    Deposit: 0,
    WithDraw: 0,
    Balance: 0
  }
])

const xx1 = (flag) => {
  console.log('xx1', flag)
}
const xx2 = (flag) => {
  console.log('xx2', flag)
}
const moneySpanMethod = ({ rowIndex, columnIndex }) => {
  const len = moneyData.length
  if (columnIndex === 0) {
    if (rowIndex === 0) {
      return {
        rowspan: len,
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
    <ElTabs v-model="activeName" @tab-click="handleClick">
      <ElTabPane label="平台账面资金" name="platformTab">
        <ElRow :gutter="20">
          <ElCol :span="12">
            <DetailTable title="基本信息" @active="xx1" :columns="tableColumns1" :data="data1" />
          </ElCol>
          <ElCol :span="12">
            <DetailTable title="基本信息" @active="xx2" :columns="tableColumns2" :data="data2" />
          </ElCol>
        </ElRow>
        <DetailTable
          title="钱包资产"
          :columns="moneyColumns3"
          :span-method="moneySpanMethod"
          :data="moneyData"
        />
      </ElTabPane>
      <ElTabPane label="中央钱包资产" name="moneyTab">
        <DetailTable title="钱包资产" :columns="tableColumns3" :data="data3" />
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
