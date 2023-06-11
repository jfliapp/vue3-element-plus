<script setup lang="ts">
import OwnDivider from '@/components/OwnDivider/index.vue'
import { Table } from '@/components/Table-new'
import { propTypes } from '@/utils/propTypes'
import { ElButton } from 'element-plus'
import { ref, defineProps, defineEmits, PropType } from 'vue'
const props = defineProps({
  title: propTypes.string.def('标题'),
  showLine: propTypes.bool.def(false),
  showAction: propTypes.bool.def(true),
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  },
  data: {
    type: Array as PropType<Recordable[]>,
    default: () => {}
  },
  spanMethod: Function
})
const emits = defineEmits(['action'])
const show = ref(true)
const action = (item) => {
  show.value = !show.value
  console.log(props.data, 'detailTable')
  emits('action', item)
}
</script>
<template>
  <div>
    <OwnDivider :title="title" :show-action="showAction" :show-line="showLine" @action="action">
      <template #default="{ flag }">
        <ElButton type="primary">{{ flag ? '收起' : '展开' }}</ElButton>
      </template>
    </OwnDivider>
    <Transition>
      <div v-if="show">
        <Table :span-method="spanMethod" :columns="columns" :data="data" />
      </div>
    </Transition>
  </div>
</template>
