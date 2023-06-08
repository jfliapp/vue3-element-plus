import { Slots } from 'vue'
import { isFunction } from '@/utils/is'
import { Options } from '@/types/Options'

export const getSlot = (slots: Slots, slot = 'default', data?: Recordable) => {
  // Reflect.has 判断一个对象是否存在某个属性
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  return slotFn(data)
}

// 下拉选择知道val获取label
export const getLabel = (data: Options[], key: string): string | number => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.value === key) {
      return item.label
    }
  }
  return '-'
}
