<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { Form } from '@/components/Form-new'
import OwnDivider from '@/components/OwnDivider/index.vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadioButton,
  ElRow,
  ElCol,
  ElButton,
  ElMessage
} from 'element-plus'
import DetailTable from '../AccountManagement/components/DetailTable.vue'
import { useForm } from '@/hooks/web/useForm'
import { getCashAcctInfoApi, getStaffAdjustAcctApi } from '@/api/moneyManagement'
import { redBlueForm, redBleListColumns } from './const'
import { reactive } from 'vue'

const { register, methods } = useForm()

const redBlueFillForm = reactive({
  acctid: '',
  action: '',
  amt: '',
  curcode: '',
  desc: ''
})

const redBlueData = reactive({
  Sacs: []
})

const check = async () => {
  const res = await getCashAcctInfoApi({ acctid: redBlueFillForm.acctid })
  redBlueData.Sacs = res.data.Sacs
  methods.setValues(res.data)
}
const submit = async () => {
  const res = await getStaffAdjustAcctApi(redBlueFillForm)
  if (res.data.error === 'OK') {
    ElMessage({
      showClose: true,
      message: '提交成功',
      type: 'success'
    })
  }
}
</script>
<template>
  <ContentWrap>
    <ElRow :gutter="20">
      <ElCol :span="8">
        <div>
          <ElForm label-position="left" label-width="100px" :model="redBlueFillForm">
            <ElFormItem label="钱包账号">
              <div class="flex justify-between">
                <ElInput v-model="redBlueFillForm.acctid" />
                <ElButton class="ml-2" type="primary" @click="check">检测</ElButton>
              </div>
            </ElFormItem>
            <ElFormItem label="操作类型">
              <ElRadioGroup v-model="redBlueFillForm.action">
                <ElRadioButton label="withdraw">红出</ElRadioButton>
                <ElRadioButton label="deposit">蓝入</ElRadioButton>
              </ElRadioGroup>
            </ElFormItem>
            <ElFormItem label="币种">
              <ElSelect v-model="redBlueFillForm.curcode">
                <ElOption label="TWD" value="TWD" />
                <ElOption label="USD" value="USD" />
                <ElOption label="USDT" value="USDT" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="金额">
              <ElInput v-model="redBlueFillForm.amt" />
            </ElFormItem>
            <ElFormItem label="备注">
              <ElInput v-model="redBlueFillForm.desc" :rows="2" type="textarea" />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="submit">提交</ElButton>
            </ElFormItem>
          </ElForm>
        </div>
      </ElCol>
      <ElCol :span="12">
        <ElRow>
          <ElCol>
            <div style="background: var(--detail-user-bg)">
              <OwnDivider title="钱包账户信息" :show-line="false" />
              <Form
                :is-custom="false"
                label-position="right"
                hide-required-asterisk
                :schema="redBlueForm"
                @register="register"
              />
            </div>
          </ElCol>
        </ElRow>
        <ElRow>
          <ElCol>
            <DetailTable
              title="钱包子账户信息"
              :columns="redBleListColumns"
              :data="redBlueData.Sacs"
            />
          </ElCol>
        </ElRow>
      </ElCol>
    </ElRow>
  </ContentWrap>
</template>
<style lang="less" scoped>
.el-form-item {
  // 手动让长度100%
  width: 100%;

  .el-select {
    width: 100%;
  }
}
</style>
