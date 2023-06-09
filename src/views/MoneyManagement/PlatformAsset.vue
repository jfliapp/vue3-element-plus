<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import DetailTable from './components/DetailTable.vue'
import { onMounted, ref } from 'vue'
// import { useRoute } from 'vue-router'
import { ElRow, ElCol, ElTabs, ElTabPane } from 'element-plus'
import { tableColumns1, tableColumns2 } from './const'
// import { getUserDetailApi } from '@/api/accountManagement'
onMounted(async () => {
  // let res = await getUserDetailApi({ eu: Number(query.id) })
  // console.log(res)
})
const activeName = ref('platformTab')

const handleClick = (tab) => {
  console.log(tab)
}
const data1 = []
const data2 = []
const xx1 = (flag) => {
  console.log('xx1', flag)
}
const xx2 = (flag) => {
  console.log('xx2', flag)
}
</script>
<template>
  <ContentWrap>
    <ElTabs v-model="activeName" @tab-click="handleClick">
      <ElTabPane label="平台账面资金" name="platformTab">
        <el-row :gutter="20">
          <el-col :span="12">
            <DetailTable title="基本信息" @active="xx1" :columns="tableColumns1" :data="data1" />
            <!-- <div style="background: var(--detail-user-bg)">
              <own-divider title="基本信息" :show-action="true" @action="xx1">
                <template #default="{ flag }">
                  <ElButton type="primary">{{ flag ? '收起' : '展开' }}</ElButton>
                </template>
              </own-divider>
              <Transition>
                <div v-if="show1">
                  <Table :columns="tableColumns5" :data="data5" />
                </div>
              </Transition>
            </div> -->
          </el-col>
          <el-col :span="12">
            <DetailTable title="基本信息" @active="xx2" :columns="tableColumns2" :data="data2" />
            <!-- <div style="background: var(--detail-user-bg)">
              <own-divider title="基本信息" :show-action="true" @action="xx2">
                <template #default="{ flag }">
                  <ElButton type="primary">{{ flag ? '收起' : '展开' }}</ElButton>
                </template>
              </own-divider>
              <Transition>
                <div v-if="show2">
                  <Table :columns="tableColumns5" :data="data5" />
                </div>
              </Transition>
            </div> -->
          </el-col>
        </el-row>
      </ElTabPane>
      <ElTabPane label="中央钱包资产" name="moneyTab">xxx</ElTabPane>
    </ElTabs>

    <!-- <detail-table title="收款方式" :columns="tableColumns1" :data="data1" />
    <detail-table title="钱包账号" :columns="tableColumns2" :data="data2" />
    <detail-table title="奖励账户" :columns="tableColumns3" :data="data3" />
    <detail-table title="配资账户" :columns="tableColumns4" :data="data4" />
    <detail-table title="合约账户" :columns="tableColumns5" :data="data5" /> -->
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
