<script lang="ts" setup>
import { ContentWrap } from '@/components/ContentWrap'
import { Form } from '@/components/Form-new'
import OwnDivide from './components/OwnDivide.vue'
import DetailTable from './components/DetailTable.vue'
import { reactive, onMounted } from 'vue'
import { ElRow, ElCol, ElImage } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { getUserDetailApi } from '@/api/accountManagement'
import { cloneDeep } from 'lodash-es'
import {
  params1,
  params2,
  params3,
  params4,
  tableColumns1,
  tableColumns2,
  tableColumns3,
  tableColumns4,
  tableColumns5
} from './const'
// cloneDeep 是防止别的地方用到数据同步过去
const basicParams = reactive(cloneDeep(params1))
const statusParams = reactive(cloneDeep(params2))
const authParams = reactive(params3)
const pswParams = reactive(params4)

const { register: basicRegister, methods: basicMethods } = useForm()
const { register: statusRegister, methods: statusMethods } = useForm()
const { register: authRegister, methods: authMethods } = useForm()
const { register: pswRegister, methods: pswMethods } = useForm()

const basicAction = async (flag) => {
  basicParams.forEach((item) => {
    if (item.isDisable) {
      item.componentProps.disabled = flag
    }
  })
  let data = await basicMethods.getFormData()
  console.log(data, 'dddd')
}
const authAction = async (flag) => {
  authParams.forEach((item) => {
    if (item.isDisable) {
      item.componentProps.disabled = flag
    }
  })
  let data = await authMethods.getFormData()
  console.log(data, 'dddd')
}
const statusAction = async (flag) => {
  statusParams.forEach((item) => {
    if (item.isDisable) {
      item.componentProps.disabled = flag
    }
  })
  let data = await statusMethods.getFormData()
  console.log(data, 'dddd')
}
const pswAction = async (flag) => {
  pswParams.forEach((item) => {
    if (item.isDisable) {
      item.componentProps.disabled = flag
    }
  })
  let data = await pswMethods.getFormData()
  console.log(data, 'dddd')
}
const data1 = reactive([])

const data2 = reactive([])

const data3 = reactive([])

const data4 = reactive([])

const data5 = reactive([])

onMounted(async () => {
  let res = await getUserDetailApi()
  console.log(res)
})
</script>
<template>
  <ContentWrap>
    <section class="">
      <el-row :gutter="20">
        <el-col :span="8">
          <div style="background: var(--detail-user-bg)">
            <own-divide title="基本信息" :show-action="true" @action="basicAction" />
            <Form
              :is-custom="false"
              label-position="right"
              hide-required-asterisk
              :schema="basicParams"
              @register="basicRegister"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col>
              <div style="background: var(--detail-user-bg)">
                <own-divide title="状态设置" :show-action="true" @action="statusAction" />
                <Form
                  :is-custom="false"
                  label-position="right"
                  hide-required-asterisk
                  :schema="statusParams"
                  @register="statusRegister"
                />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div style="background: var(--detail-user-bg)">
                <own-divide title="权限设置" :show-action="true" @action="authAction" />
                <Form
                  :is-custom="false"
                  label-position="right"
                  hide-required-asterisk
                  :schema="authParams"
                  @register="authRegister"
                /> </div
            ></el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col>
              <div style="background: var(--detail-user-bg)">
                <own-divide title="密码设置" :show-action="true" @action="pswAction" />
                <Form
                  :is-custom="false"
                  label-position="right"
                  hide-required-asterisk
                  :schema="pswParams"
                  @register="pswRegister"
                />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div style="background: var(--detail-user-bg)">
                <own-divide title="文件" />
                <div class="flex justify-around">
                  <div class="flex flex-col items-center">
                    <el-image
                      style="width: 100px; height: 100px"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    />
                    <span class="pt-1 text-sm text-dark-50">身份证正面照片</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <el-image
                      style="width: 100px; height: 100px"
                      src="data:image/png;base64,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"
                    />
                    <span class="pt-1 text-sm text-dark-50">身份证反面照片</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <el-image
                      style="width: 100px; height: 100px"
                      src="data:image/png;base64,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"
                    />
                    <span class="pt-1 text-sm text-dark-50">手持证件照</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </section>
    <detail-table title="收款方式" :columns="tableColumns1" :data="data1" />
    <detail-table title="钱包账号" :columns="tableColumns2" :data="data2" />
    <detail-table title="奖励账户" :columns="tableColumns3" :data="data3" />
    <detail-table title="配资账户" :columns="tableColumns4" :data="data4" />
    <detail-table title="合约账户" :columns="tableColumns5" :data="data5" />
  </ContentWrap>
</template>
<style lang="less">
.yy {
  background: yellow;
}
</style>
