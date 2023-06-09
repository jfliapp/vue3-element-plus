<script lang="tsx">
import { Form } from '@/components/Form-new'
import { useForm } from '@/hooks/web/useForm'
import { propTypes } from '@/utils/propTypes'
import { PropType, defineComponent } from 'vue'
export default defineComponent({
  name: 'SearchNew',
  // 生成Form的布局结构数组
  props: {
    inline: propTypes.string.def('inline'),
    schema: {
      type: Array as PropType<FormSchema[]>,
      default: () => []
    }
  },
  setup(props, { slots, emit }) {
    const xx = async (e) => {
      console.log('xx', e)
      emit('xx', await methods.getFormData())
    }
    const { register, elFormRef, methods } = useForm({})
    console.log(elFormRef, methods)
    const allProps = { schema: props.schema, isCustom: false, register: register }
    return () => (
      <div>
        {/* 这里如果是inline 需要手动删除 job */}
        <Form {...allProps}>{{ ...slots }}</Form>
        {/* 所有的按钮的操作都放到这里 */}
        <div onClick={xx}>{slots.job!()}</div>
      </div>
    )
  }
})
</script>
