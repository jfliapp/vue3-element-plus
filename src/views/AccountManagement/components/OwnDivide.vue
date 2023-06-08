<script setup lang="ts">
import { propTypes } from '@/utils/propTypes'
import { defineProps, ref } from 'vue'
import { ElButton } from 'element-plus'

defineProps({
  title: propTypes.string.def(''),
  showLine: propTypes.bool.def(true),
  showAction: propTypes.bool.def(false)
})

const flag = ref<boolean>(true)
</script>
<template>
  <div class="divider">
    <div class="title" v-if="title !== ''">{{ title }}</div>
    <div v-if="showLine" class="line"></div>
    <div v-if="showAction" @click="$emit('action', flag)">
      <el-button type="primary" @click="flag = !flag"
        ><Icon icon="tabler:edit" /> {{ flag ? '编辑' : '完成' }}</el-button
      >
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
