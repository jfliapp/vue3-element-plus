<script setup lang="ts">
import { Form } from '@/components/Form-new'
import { PropType, computed, watch, unref, ref } from 'vue'
import { propTypes } from '@/utils/propTypes'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'
import { findIndex, formatTime } from '@/utils'
import { cloneDeep } from 'lodash-es'
// import { FormSchema } from '@/types/form'

const { t } = useI18n()

const props = defineProps({
  // 生成Form的布局结构数组
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  // 是否需要栅格布局
  isCol: propTypes.bool.def(true),
  // 表单label宽度
  labelWidth: propTypes.oneOfType([String, Number]).def('auto'),
  // 操作按钮风格位置
  layout: propTypes.string.validate((v: string) => ['inline', 'bottom'].includes(v)).def('inline'),
  // 底部按钮的对齐方式
  buttomPosition: propTypes.string
    .validate((v: string) => ['left', 'center', 'right'].includes(v))
    .def('center'),
  flag: propTypes.bool.def(false),
  showSearch: propTypes.bool.def(true),
  showExportExcel: propTypes.bool.def(false),
  showHoldingSum: propTypes.bool.def(false),
  showAdd: propTypes.bool.def(false),
  showSum: propTypes.bool.def(false),
  showReset: propTypes.bool.def(true),
  // 是否显示伸缩
  expand: propTypes.bool.def(false),
  // 伸缩的界限字段
  expandField: propTypes.string.def(''),
  inline: propTypes.bool.def(true),
  fieldHn: {
    type: Array as PropType<Recordable>,
    default: () => []
  },
  model: {
    type: Object as PropType<Recordable>,
    default: () => ({})
  }
})

const emit = defineEmits(['search', 'reset', 'exportExcel', 'addHn', 'sumHn', 'holdingSumHn'])

const visible = ref(true)
const flag = ref(props.flag)

const newSchema = computed(() => {
  let schema: FormSchema[] = cloneDeep(props.schema)
  if (props.expand && props.expandField && !unref(visible)) {
    const index = findIndex(schema, (v: FormSchema) => v.field === props.expandField)
    if (index > -1) {
      const length = schema.length
      schema.splice(index + 1, length)
    }
  }
  if (props.layout === 'inline') {
    schema = schema.concat([
      {
        field: 'action',
        formItemProps: {
          labelWidth: '0px'
        }
      }
    ])
  }
  schema.map((item) => {
    // Search 组件查询默认都是4个一组
    item.colProps = {
      span: 8
    }
    return item
  })
  return schema
})

watch(
  () => props.flag,
  (newVal) => {
    flag.value = newVal
  }
)

const { register, elFormRef, methods } = useForm({
  model: props.model || {}
})
const dateRangeFn = {
  name: '__dateRange',
  fn: (item) => {
    return {
      begintm: formatTime(item[0], 'yyyy/MM/dd'),
      endtm: formatTime(item[1], 'yyyy/MM/dd')
    }
  }
}

const search = async () => {
  await unref(elFormRef)?.validate(async (isValid) => {
    if (isValid) {
      const { getFormData } = methods
      const model = await getFormData()
      let temp = { ...model }
      let fieldHns = props.fieldHn || []
      if (temp.hasOwnProperty('__dateRange') && !temp.__dateRange) {
        delete temp.__dateRange
      }
      if (temp.__dateRange) {
        fieldHns.push(dateRangeFn)
      }
      if (fieldHns.length > 0) {
        fieldHns.forEach((item) => {
          const v = temp![item.name]
          if (v) {
            let o = item.fn(v)
            delete temp[item.name]
            temp = { ...temp, ...o }
          }
        })
      }
      emit('search', temp)
    }
  })
}

const handle = (item) => {
  flag.value = !flag.value
  emit(item, flag.value)
}

const reset = async () => {
  unref(elFormRef)?.resetFields()
  const { getFormData } = methods
  const model = await getFormData()
  emit('reset', model)
}

const bottonButtonStyle = computed(() => {
  return {
    textAlign: props.buttomPosition as unknown as 'left' | 'center' | 'right'
  }
})

const setVisible = () => {
  unref(elFormRef)?.resetFields()
  visible.value = !unref(visible)
}
</script>

<template>
  <Form
    :is-custom="false"
    :label-width="labelWidth"
    label-position="right"
    hide-required-asterisk
    :inline="inline"
    :is-col="isCol"
    :schema="newSchema"
    @register="register"
  >
    <template #action>
      <div v-if="layout === 'inline'">
        <ElButton v-if="showSearch" type="primary" @click="search">
          <Icon icon="ep:search" class="mr-5px" />
          {{ t('common.query') }}
        </ElButton>
        <ElButton v-if="showReset" @click="reset">
          <Icon icon="ep:refresh-right" class="mr-5px" />
          {{ t('common.reset') }}
        </ElButton>
        <ElButton v-if="showExportExcel" type="primary" @click="handle('exportExcel')">
          <Icon icon="tabler:file-export" class="mr-5px" />
          {{ t('导出') }}
        </ElButton>
        <ElButton v-if="showHoldingSum" type="primary" @click="handle('holdingSumHn')">
          <Icon icon="tabler:file-export" class="mr-5px" />
          {{ t('持仓汇总') }}
        </ElButton>
        <ElButton v-if="showSum" type="primary" @click="handle('sumHn')">
          <Icon icon="tabler:file-export" class="mr-5px" />
          {{ t('汇总') }}
        </ElButton>
        <ElButton v-if="showAdd" type="primary" @click="handle('addHn')">
          <Icon icon="fluent-mdl2:add-to" class="mr-5px" />
          {{ t('新增') }}
        </ElButton>
        <ElButton v-if="expand" text @click="setVisible">
          {{ t(visible ? 'common.shrink' : 'common.expand') }}
          <Icon :icon="visible ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
        </ElButton>
      </div>
    </template>
  </Form>

  <template v-if="layout === 'bottom'">
    <div :style="bottonButtonStyle">
      <ElButton v-if="showSearch" type="primary" @click="search">
        <Icon icon="ep:search" class="mr-5px" />
        {{ t('common.query') }}
      </ElButton>
      <ElButton v-if="showReset" @click="reset">
        <Icon icon="ep:refresh-right" class="mr-5px" />
        {{ t('common.reset') }}
      </ElButton>
      <ElButton v-if="expand" text @click="setVisible">
        {{ t(visible ? 'common.shrink' : 'common.expand') }}
        <Icon :icon="visible ? 'ant-design:up-outlined' : 'ant-design:down-outlined'" />
      </ElButton>
    </div>
  </template>
</template>
