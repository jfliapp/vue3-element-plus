<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { defineProps, ref, defineEmits } from 'vue'
import { ElButton } from 'element-plus'

defineProps({
  title: propTypes.string.def(''),
  showLine: propTypes.bool.def(true),
  showAction: propTypes.bool.def(false)
})
const emit = defineEmits(['action'])

const flag = ref<boolean>(true)
const action = () => {
  flag.value = !flag.value
  emit('action', flag.value)
}
</script>
<template>
  <div class="divider flex justify-between">
    <div class="title" v-if="title !== ''">{{ title }}</div>
    <div v-if="showLine" class="line"></div>
    <div v-if="showAction" @click="action">
      <slot :flag="flag">
        <ElButton type="primary">
          <Icon icon="tabler:edit" /> {{ flag ? '编辑' : '完成' }}
        </ElButton>
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.divider {
  display: flex;
  padding: 8px;
  margin: 20px 0;
  border-left: 5px solid #3a6ce3;
  // background-color: #f9fbff;
  border-radius: 4px;
  align-items: center;

  .tilte {
    color: #3a6ce3;
  }

  .line {
    width: 100%;
    margin: 0 20px;
    border-top: 1px solid #ccc;
    flex: 1;
  }
}
</style>
