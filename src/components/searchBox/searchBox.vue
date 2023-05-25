<template>
<!-- 查询组件 -->
  <div class="top-select bg-write">
    <div class="header-filter">
		<el-form label-position="right" :label-width="labelWidth">
			<el-row v-for="(item,index) in filters" :key="index" :class="[index < filters.length - 1?'father':'father mar-B0']" align="center">
				<el-col v-for="(items,index) in item" :span="items.colSpan" :key="index">
					<el-form-item :label="items.label">
						<el-select v-if="items.type === 'select'" clearable v-model="formItem[items.key]" :placeholder="items.placeholder" :multiple="items.multiple">
							<el-option v-for="(option, index) in items.options" :key="index" :label="items.defaultSlect? option[items.defaultSlect.label]:option.label" :value="items.defaultSlect? option[items.defaultSlect.value]:option.value">
							</el-option>
						</el-select>
						<el-date-picker
							v-else-if="items.type === 'datetime'"
							clearable
							v-model="formItem[items.key]"
							:type="items.dateType"
							value-format="yyyy-MM-dd HH:mm:ss"
							:placeholder="items.placeholder"
						></el-date-picker>
						<el-date-picker
							v-else-if="items.type === 'daterange'"
							clearable
							v-model="formItem[items.key]"
							value-format="yyyy-MM-dd HH:mm:ss"
							:type="items.dateType"
							:range-separator="items.placeholder.rangeSeparator"
							:start-placeholder="items.placeholder.startPlaceholder"
							:end-placeholder="items.placeholder.endPlaceholder">
						</el-date-picker>
						<el-date-picker
							v-else-if="items.type === 'datetimerange'"
							clearable
							v-model="formItem[items.key]"
							value-format="yyyy-MM-dd HH:mm:ss"
							:type="items.dateType"
							:range-separator="items.placeholder.rangeSeparator"
							:start-placeholder="items.placeholder.startPlaceholder"
							:end-placeholder="items.placeholder.endPlaceholder">
						</el-date-picker>
						<el-date-picker
							v-else-if="items.type === 'pickerOptions'"
							clearable
							v-model="formItem[items.key]"
							value-format="yyyy-MM-dd HH:mm:ss"
							:type="items.dateType"
							:default-value='defaultValue'
							:picker-options="pickerOptions"
							:range-separator="items.placeholder.rangeSeparator"
							:start-placeholder="items.placeholder.startPlaceholder"
							:end-placeholder="items.placeholder.endPlaceholder">
						</el-date-picker>
						<el-input v-else clearable v-model="formItem[items.key]" :placeholder="items.placeholder"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
    </div>
  </div>
</template>
<script>
export default {
    name: '',
    components: {},
	props: {
		pickerOptionss: {
			type: Object,
			default:() => {
				return {}
			}
		},
		labelWidth:{
			type:String,
			default:"100px",
		},
		resetSearchBoxFalg:{
			type:Boolean,
			default:false,
		},
		searchFalg:{
			type:Boolean,
			default:false,
		},
		filters: {
			type: Array,
			default: []
		}
	},
    data() {
        return {
			defaultValue: new Date(this.pickerOptionss.settleYear,this.pickerOptionss.settleDateMonth-1,1),
			pickerOptions: {
				disabledDate: time => {
					return this.selectTime(time);//调用方法
				}
			},
			formShowFalg:false,
			iput:'',
			formItem: {
			}
        };
    },
    created() {
        this.initDate()
    },
	watch:{
		resetSearchBoxFalg(){
			this.resetData()
		},
		searchFalg(){
			console.log(333)
			this.search()
		}
	},
    methods: {
		selectTime(time) {
			return time.getTime() >= (new Date(this.pickerOptionss.settleYear,this.pickerOptionss.settleDateMonth,1).getTime()) || time.getTime() < (new Date(this.pickerOptionss.settleYear,this.pickerOptionss.settleDateMonth-1,1).getTime())
		},
		// 重置查询表单数据，同时触法触法父组件触法父组件刷新表格数据
		resetData () {
			this.filters.forEach(elements => {
				elements.forEach(element => {
					switch (element.type) {
					case 'date':
						if (/dateRange$/ig.test(element.dateType)) {
							this.formItem[`${element.key}`] = []
						} else {
							this.formItem[`${element.key}`] = ''
						}
						break
					case 'input':
						this.formItem[`${element.key}`] = ''
						break
					case 'select':
						if (element.multiple) {
							this.formItem[`${element.key}`] = []
						} else {
							this.formItem[`${element.key}`] = ''
						}
						break
					default:
						this.formItem[`${element.key}`] = ''
						break
					}
				})
			})
			this.$emit('resetDate', this.formItem)
		},
		// 点击查询触法父组件触法父组件刷新表格数据同时传递数据
		search (){
			console.log(this.formItem)
			this.$emit('resetDate', this.formItem)
		},
		initDate () {
			if (this.filters.length > 0) {
				const arr = []
				for (let i = 0; i < this.filters.length; i++) {
					const elements = this.filters[i]
					for (let h = 0; h < elements.length; h++) {
						const elementss = elements[h]
						arr.push(elementss)
					}
				}
				arr.forEach(element => {
					this.$set(this.formItem, element.key, element.value)
				})
			}
		},
    },
}
</script>
<style scoped lang="scss">
	.top-select{
		.header-filter {
		flex-wrap: wrap;
		padding-top:16px;
		margin: 0px auto;
		background-color: #fff;
		.form-group {
			margin: 0 auto;
		}
		.date-picker {
			display: block;
		}
		.btn {
			margin-right: 18px !important;
		}
		.header-filter-btn{
			display: flex;
			.recordBtn {
				width: 120px;
				height: 39px;
				margin-right: 40px;
				background: #1890ff;
				color: #fff;
			}
		}
		}
	}
	// ::v-deep(.el-date-editor--timerange.el-input__inner){
	// 	width: 100% !important;
	// }
	// ::v-deep(.el-range-editor.el-input__inner){
	// 	width: 100%;
	// }
	// ::v-deep(.el-form-item__content){
	// 	margin-left:0px !important
	// }
	// ::v-deep(.el-select){
	// 	width: 100%;
	// }
	// ::v-deep .el-select{
	// 	width: 100%;
	// }
	// ::v-deep .el-date-editor{
	// 	width: 100%;
	// }
</style>
