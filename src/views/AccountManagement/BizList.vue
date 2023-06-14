<script setup lang="ts">
import { getBizListApi, addBizApi } from '@/api/accountManagement'
import { ContentWrap } from '@/components/ContentWrap'
import { Table } from '@/components/Table-new'
import { Form } from '@/components/Form-new'
import { Search } from '@/components/Search'
import { useTable } from '@/hooks/web/useTable-new'
import { useForm } from '@/hooks/web/useForm'
import { ElDialog, ElButton } from 'element-plus'
import { tableDataFieldType, tableFieldsType } from './types'
import { addTradeInfoParams, tradeInfoTableColumns } from './const'
// import { useI18n } from '@/hooks/web/useI18n'

import { ref } from 'vue'

// const { t } = useI18n()

const { register: registryForm, elFormRef, methods: methodsForm } = useForm({})
const { register, tableObject, methods } = useTable<tableDataFieldType>({
  getListApi: getBizListApi,
  // delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'listcount'
  }
})

methods.getList()
const dialogVisible = ref(false)
const addUserInfoRules = {
  invitecode: [{ required: true, message: '邀请码不能为空', trigger: 'blur' }],
  country: [
    {
      required: true,
      message: '请选择国家',
      trigger: 'change'
    }
  ],
  tel: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
  mail: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '请填写正确的邮箱' }
  ],
  pwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}
const addTradeInfoHn = async () => {
  elFormRef.value!.validate(async (valid) => {
    if (valid) {
      const item = await methodsForm.getFormData()
      let res = await addBizApi(item)
      if (res.data.error === 'OK') {
        dialogVisible.value = false
        methods.getList()
      }
    }
  })
}
const addHn = () => {
  dialogVisible.value = true
}

const searchParams: tableFieldsType[] = [
  {
    field: '',
    value: '',
    prop: '',
    label: '',
    component: 'Input'
  }
]
</script>
<template>
  <ElDialog v-model="dialogVisible" title="新增" width="30%">
    <Form
      label-position="right"
      :rules="addUserInfoRules"
      hide-required-asterisk
      :schema="addTradeInfoParams"
      @register="registryForm"
    />
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="dialogVisible = false">Cancel</ElButton>
        <ElButton type="primary" @click.stop.prevent="addTradeInfoHn"> Confirm </ElButton>
      </span>
    </template>
  </ElDialog>
  <ContentWrap>
    <Search
      layout="inline"
      :showReset="false"
      :showAdd="true"
      :schema="searchParams"
      @add-hn="addHn"
      @search="methods.setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="tradeInfoTableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    />
  </ContentWrap>
</template>
