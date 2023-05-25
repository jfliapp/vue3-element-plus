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
                <el-table-column prop="orderNo" width="150px" fixed label="合约编号" align="center" />
                <el-table-column prop="goodsName" width="220px" label="商品名称" align="center" />
                <el-table-column prop="supplierName" width="150px" label="合作商" align="center" />
                <el-table-column prop="settleAmount.decimalTwoString" width="150px" label="结算价" align="center" />
                <el-table-column prop="totalAmount.decimalTwoString" width="150px" label="会员价" align="center" />
                <el-table-column prop="quantity" width="150px" label="购买数量" align="center" />
                <el-table-column prop="payAmount.decimalTwoString" width="150px" label="实际付款金额" align="center" />
                <el-table-column prop="orderStatus" width="150px" :formatter="formatterOrderStatus" label="合约状态" align="center" />
                <el-table-column prop="pointsTpAmount.decimalFourString" width="150px" label="TP积分发放总数量" align="center" />
                <el-table-column prop="pointsPartnerAmount.decimalFourString" width="200px" label="[合作商]积分发放总数量" align="center" />
                <el-table-column prop="pointsProAmount.decimalFourString" width="150px" label="PRO积分发放总数量" align="center" />
                <el-table-column prop="payTime" width="180px" label="创建时间" align="center" />
                <el-table-column prop='' label="操作" align="center" width="100" fixed="right">
                    <template slot-scope="scope">
                        <div style="display:flex;justify-content: center;">
                            <el-button type="text" @click="operation(scope.row,'see')">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pageList" @current-change="handleCurrentChange" v-show="totalNum > 10" :page-size='10' layout="total, prev, pager, next" :total="totalNum">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { searchPointsList } from '@/api/autarkyManage/integralManage'
import searchBox from "@/components/searchBox/searchBox.vue";

export default {
    name: 'integralManage',
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
						key: 'orderNo',
						type: 'input',
						label: '合约编号',
						placeholder: '请输入合约编号',
						boxLocation: true,
						value: '',
						colSpan: 6
					},
                    {
						key: 'buyerPhone',
						type: 'input',
						label: '会员手机号码',
						placeholder: '请输入会员手机号码',
						boxLocation: true,
						value: '',
						colSpan: 6
					},
                    {
						key: 'startTime_endTime',
						type: 'datetimerange',
						dateType: 'datetimerange',
						label: '合约创建时间',
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
        formatterOrderStatus(row){
            let str = ''
            if(row.orderStatus == 20){
                str = '待发货'
            } else if(row.orderStatus == 30){
                str = '已发货'
            } else if(row.orderStatus == 50){
                str = '交易成功'
            }
            return str
        },
        operation(item,str) {
            this.$router.push({
                path: '/self-support/integralManage/details',
                query: {
                    detail: JSON.stringify(item),
                    type:str,
                }
            })
        },
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
				this.searchData.payTimeStart = ''
				this.searchData.payTimeEnd = ''
			} else {
				this.searchData.payTimeStart = data.startTime_endTime[0]
				this.searchData.payTimeEnd = data.startTime_endTime[1]
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
            searchPointsList(data).then(res => {
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