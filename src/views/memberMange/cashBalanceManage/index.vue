<template>
    <div class='container'>
        <div class="recordHead">
            <!-- 查询 -->
            <search-box ref="searchBox" :labelWidth='labelWidth' :searchFalg='searchFalg' :resetSearchBoxFalg='resetSearchBoxFalg' :filters ="filters" @resetDate="resetTableDate"></search-box>
            <div class="btnBox">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button icon="el-icon-refresh" @click="resetSearchBox">重置</el-button>
            </div>
        </div>
        <div class="center">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="80px" fixed>
                    <template slot-scope="scope">
                        {{ (pageNum-1)*pageSize+scope.$index+1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="会员手机号码" align="center" />
                <el-table-column prop="level" label="会员等级" align="center" />
                <el-table-column prop="agentName" label="归属运营商" align="center" />
                <el-table-column prop="balance.decimalTwoString" label="现金余额" align="center" />
                <el-table-column prop="createTime" label="创建时间" align="center" />
            </el-table>
            <el-pagination class="pageList" @current-change="handleCurrentChange" v-show="totalNum > 10" :page-size='10' layout="total, prev, pager, next" :total="totalNum">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { getUserCashList } from '@/api/member'
import searchBox from "@/components/searchBox/searchBox.vue";

export default {
    name: '',
    components: {
        searchBox,
    },
    data() {
        return {
            searchData:{},
            labelWidth:'120px',
            setType:'',
            toleranceDialogFormVisible:false,
            resetSearchBoxFalg:false,
            searchFalg:false,
            editDialogFormVisibles:false,
            editDialogFormVisible:false,
            delDialogFormVisible:false,
            rowData:{},
            editData:{},
            filters: [
				[
                    {
						key: 'userName',
						type: 'input',
						label: '会员手机号码',
						placeholder: '请输入会员手机号码',
						boxLocation: true,
						value: '',
						colSpan: 5
					},
                    {
						key: 'agentName',
						type: 'input',
						label: '归属运营商',
						placeholder: '请输入归属运营商',
						boxLocation: true,
						value: '',
						colSpan: 5
					},
                    {
						key: 'level',
						type: 'select',
						valueType: 'string',
						placeholder: '请选择会员等级',
						colSpan: 4,
						options:[
							{
								label: '青铜',
								value:  '1',
							},
							{
								label: '白银',
								value:  '2',
							},
                            {
								label: '白金',
								value:  '3',
							},
                            {
								label: '黄金',
								value:  '4',
							},
                            {
								label: '铂金',
								value:  '5',
							},
                            {
								label: '钻石',
								value:  '6',
							},
                        ],
						label: '会员等级',
						value: ''
					},
                    {
						key: 'startTime_endTime',
						type: 'datetimerange',
						dateType: 'datetimerange',
						label: '创建时间',
						placeholder: {
							rangeSeparator: '至',
							startPlaceholder: '开始日期',
							endPlaceholder: '结束日期'
						},
						value: [],
						colSpan: 8
					}

				],

			],
            tableData: [],
            totalNum: 0,
            pageNum: 1,
            pageSize: 10,
        };
    },
    created() {
        this.searchTableList()
    },
    methods: {
        // 重置搜索
        resetSearchBox(){
            this.resetSearchBoxFalg = !this.resetSearchBoxFalg
        },
        // 搜索
        search(){
            this.searchFalg = !this.searchFalg
        },
        // 查询组件回调
        resetTableDate(data){
            this.searchData = { ...data }
			if (data.startTime_endTime == '' || !data.startTime_endTime.length) {
				this.searchData.startTime = ''
				this.searchData.endTime	 = ''
			} else {
				this.searchData.startTime = data.startTime_endTime[0]
				this.searchData.endTime = data.startTime_endTime[1]
			}
			delete this.searchData.startTime_endTime
            this.searchTableList()
        },
        // 查询表格数据
        searchTableList() {
			const data = {
				limit: this.pageSize,
				page: this.pageNum
			}
			for (const key in this.searchData) {
				if (Object.hasOwnProperty.call(this.searchData, key)) {
					const element = this.searchData[key]
					data[key] = element
				}
			}
            getUserCashList(data).then(res => {
                console.log(res)
                if (res.success) {
                    this.tableData = res.data
                    this.totalNum = res.count
                    this.totalShop = res.totalRow
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                    return
                }
            })
        },
        // 切换页码
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNum = val
            this.searchTableList()
        },
        edit(row){
        },
    },
}
</script>
<style lang='scss' scoped>
.container ::v-deep input::-webkit-outer-spin-button, .container ::v-deep input::-webkit-inner-spin-button{
    -webkit-appearance: none !important
}
.container ::v-deep input[type='number']{
    -moz-appearance: textfield
}
.container {
    padding: 20px;
    .center{
        margin-top: 20px;
    }
    .detailalert {
        ::v-deep .el-dialog__body {
            padding: 10px 20px 30px;
        }
        .leadBtn {
            text-align: center;
            button {
                width: 120px;
                margin: 0 20px;
            }
        }
        ul {
            padding: 0;
            li {
                display: flex;
                width: 100%;
                height: 50px;
                justify-content: space-between;
                border-bottom: 1px solid #ccc;
                p:first-child {
                    color: #999;
                }
            }
        }
        .leadP {
            display: flex;
            margin-bottom: 10px;
            span {
                flex-shrink: 1;
                height: 38px;
                line-height: 38px;
                min-width: 120px;
            }
            .leadInput {
                width: 300px;
                margin-right: 10px;
            }
        }
    }
    .recordHead {
        .btnBox{
            margin-bottom: 20px;
            .el-button{
                width: 100px;
            }
        }
        .changeTime {
            display: flex;
            margin-bottom: 20px;
        }
        .changeName {
            width: 188px;
        }
        p {
            line-height: 36px;
            padding-right: 20px;
            font-size: 14px;
            margin: 0;
        }
        .rechangeMan {
            padding-left: 20px;
        }
        .recordBtn {
            width: 120px;
            height: 39px;
            margin-right: 40px;
            background: #1890ff;
            color: #fff;
        }
    }
    .pageList {
        width: 100%;
        text-align: center;
        padding: 20px 0;
    }
    .editBtn{
        margin-right: 10px;
    }
}
</style>