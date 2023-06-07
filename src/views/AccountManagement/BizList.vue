<script setup lang="ts">
import { getBizListApi } from '@/api/accountManagement'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType, tableFieldsType } from './types'
// import { useI18n } from '@/hooks/web/useI18n'

// import { reactive } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getBizListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount'
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
    field: 'Caption',
    prop: 'Caption',
    label: 'ID'
  },
  {
    prop: 'Code',
    field: 'Code',
    label: 'Code'
  },
  {
    prop: 'BindTel',
    field: 'BindTel',
    label: '账户ID'
  },
  {
    prop: 'BindMail',
    field: 'BindMail',
    label: '名称'
  },
  {
    prop: 'UplineDirect',
    field: 'UplineDirect',
    label: '直接上级'
  },
  {
    prop: 'Caption',
    field: 'Caption',
    label: '根上级'
  },
  {
    prop: 'VerName',
    field: 'VerName',
    label: '返回地址'
  },
  {
    prop: 'VerIdCardNo',
    field: 'VerIdCardNo',
    label: '手续费费率'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '状态'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '操作员'
  },
  {
    prop: 'createdat',
    field: 'createdat',
    label: '创建时间'
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
</script>
<template>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :schema="searchParams"
      @search="methods.setSearchParams"
    />

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
    />
  </ContentWrap>
</template>
