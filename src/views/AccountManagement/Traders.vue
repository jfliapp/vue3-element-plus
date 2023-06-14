<script setup lang="ts">
import { getPartnerListApi } from '@/api/accountManagement'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType, tableFieldsType } from './types'
import { ElCheckbox, ElPopover, ElButton } from 'element-plus'
import { Icon } from '@/components/Icon'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'

// import { reactive } from 'vue'

const { t } = useI18n()
const { push } = useRouter()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getPartnerListApi,
  defaultParams: {
    AuthTradeBrokerage: 'true',
    MarketMaking: 1,
    partnertype: 1
  },
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount',
    inJson: 'BizDetail|item'
  }
})

methods.getList()

const tableColumns: TableColumn[] = [
  {
    field: 'index',
    type: 'index',
    label: '序号'
  },
  {
    field: 'id',
    label: '交易商ID'
  },
  {
    prop: 'Caption',
    field: 'Caption',
    label: '交易商名称'
  },
  {
    prop: 'Code',
    field: 'Code',
    label: '交易商代码'
  },
  {
    prop: 'UplineDirect',
    field: 'UplineDirect',
    label: '所属机构'
  },
  {
    prop: 'OwnerType',
    field: 'OwnerType',
    label: '合作伙伴类型'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '状态'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '开户时间',
    formatter: (item) => {
      return item.createdat ? item.createdat : '-'
    }
  },
  {
    prop: 'AuthOperators',
    field: 'AuthOperators',
    label: '管理员'
  },
  {
    prop: 'OpStaff',
    field: 'OpStaff',
    label: '操作员'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '成本'
  }
]
const searchParams: tableFieldsType[] = [
  {
    field: 'term',
    value: '',
    prop: 'term',
    label: '',
    component: 'Input'
  }
]
const tradersList = [
  { name: '交易商详情', url: '/accountManagement/detailTraders' },
  { name: '钱包资产', url: '/accountManagement/walletAsset' },
  { name: '出入金记录', url: '/accountManagement/cashRecord' },
  { name: '资金流水', url: '/accountManagement/moneyFlow' }
]
const goUrl = (item, url) => {
  push(`${url}?id=${item.id}`)
}
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :schema="searchParams"
      @search="methods.setSearchParams"
    >
      <template #default>
        <ElCheckbox name="selectall">下级通知</ElCheckbox>
      </template>
    </Search>

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #id="scope">
        <div>
          <ElPopover effect="light" trigger="hover" placement="right" width="auto">
            <template #default>
              <div class="flex flex-col">
                <div
                  class="flex justify-between align-middle p-1 cursor-pointer"
                  v-for="(item, idx) in tradersList"
                  :key="idx"
                  @click="goUrl(scope.row, item.url)"
                >
                  <span>
                    {{ item.name }}
                  </span>
                  <Icon
                    icon="ep:warning"
                    color="var(--el-color-primary)"
                    class="ml-2px relative top-1px"
                  />
                </div>
              </div>
            </template>
            <template #reference>
              <div class="text-blue-500 cursor-pointer">
                <Icon
                  icon="ep:warning"
                  color="var(--el-color-primary)"
                  class="ml-2px relative top-1px"
                />
                {{ scope.row.UplineDirect }}
              </div>
            </template>
          </ElPopover>
        </div>
      </template>
      <template #action="{ row }">
        <ElButton type="primary"> {{ t('exampleDemo.edit') }}{{ row.index }} </ElButton>
        <ElButton type="success">
          {{ t('exampleDemo.detail') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
