<script setup lang="ts">
import OwnDivider from '@/components/OwnDivider/index.vue'
import { Table } from '@/components/Table-new'
import { propTypes } from '@/utils/propTypes'
import { defineProps, PropType } from 'vue'
defineProps({
  title: propTypes.string.def(''),
  showLine: propTypes.bool.def(false),
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  },
  data: {
    type: Array as PropType<Recordable[]>,
    default: () => []
  }
})
</script>
<template>
  <div>
    <OwnDivider :title="title" :show-line="showLine" />
    <Table :columns="columns" :data="data" />
  </div>
</template>
