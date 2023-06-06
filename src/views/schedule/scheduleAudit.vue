<script setup lang="ts">
import { getSchduleEnduserListApi } from '@/api/schdule'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { tableDataFieldType, tableFieldsType } from './types'
// import { useI18n } from '@/hooks/web/useI18n'

// import { reactive } from 'vue'

// const { t } = useI18n()

const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getSchduleEnduserListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount'
  }
})

methods.getList()

const tableColumns: tableFieldsType[] = [
  {
    field: 'Caption',
    prop: 'Caption',
    label: 'ID'
  },
  {
    prop: 'Caption',
    field: 'Caption',
    label: '邀请人'
  },
  {
    prop: 'UplineDirect',
    field: 'UplineDirect',
    label: '直接上级'
  },
  {
    prop: 'BindTel',
    field: 'BindTel',
    label: '手机号'
  },
  {
    prop: 'BindMail',
    field: 'BindMail',
    label: '邮箱'
  },
  {
    prop: 'Caption',
    field: 'Caption',
    label: '证件类型'
  },
  {
    prop: 'VerName',
    field: 'VerName',
    label: '姓名'
  },
  {
    prop: 'VerIdCardNo',
    field: 'VerIdCardNo',
    label: '证件号码'
  },
  {
    prop: 'Status',
    field: 'Status',
    label: '状态'
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
