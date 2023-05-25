<template>
    <div class="container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="88px">
            <el-form-item label="付款人" prop="supplierType">
                <el-input v-model="queryParams.buyerPhone" placeholder="请输入付款人手机号" clearable />
            </el-form-item>
            <el-form-item label="订单号" prop="settleAddress" label-width="140px">
                <el-input v-model="queryParams.orderNo" placeholder="请输入订单号" clearable />
            </el-form-item>
            <el-form-item label="商品金额" prop="settleAddress" label-width="140px">
                <el-col :span="11">
                    <el-input v-model="queryParams.goodsAmountStart" placeholder="商品金额开始" clearable />
                </el-col>
                <el-col class="line" :span="2" style="text-align:center">-</el-col>
                <el-col :span="11">
                    <el-input v-model="queryParams.goodsAmountEnd" placeholder="商品金额结束" clearable />
                </el-col>
            </el-form-item>
            <el-form-item label="拼单类型" prop="dateRange" v-if="settleStatus == 1">
                <el-select v-model="groupQuantity" placeholder="请选择">
                    <el-option v-for="item in quantityOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="拼单状态" prop="dateRange" v-if="settleStatus == 1">
                <el-select v-model="groupOrderStatus" placeholder="请选择">
                    <el-option v-for="item in OrderOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="付款时间" prop="dateRange">
                <el-date-picker v-model="queryParams.dateRange" placeholder="选择时间" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
                <el-button icon="el-icon-refresh-right" @click="refreshBtn">刷新</el-button>
            </el-form-item>
        </el-form>
        <div class="center">
            <el-tabs v-model="settleStatus" type="border-card" @tab-click="handleClick">
                <el-tab-pane :label="'直购 '+ tabData.directCnt" name="0">
                    <el-table :data="tableData1" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum1-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderNo" label="合约编号" align="center" />
                        <el-table-column prop="goodsName" label="商品名称" align="center" />
                        <el-table-column prop="quantity" label="购买数量" align="center" />
                        <el-table-column prop="internalPrice.decimalTwoString" label="商品会员价" align="center" />
                        <el-table-column prop="freightAmount.decimalTwoString" label="物流金额" align="center" />
                        <el-table-column prop="payAmount.decimalTwoString" label="实际付款金额" align="center" />
                        <el-table-column prop="shippingName" label="收货人姓名" align="center" />
                        <el-table-column prop="shippingAddress" label="收货地址" align="center" />
                        <el-table-column prop="shippingPhone" label="收货人联系方式" align="center" />
                        <el-table-column prop="orderStatus.message" label="合约状态" align="center" />
                    </el-table>
                    <el-pagination :hide-on-single-page="true" class="pageList" :page-size="pageSize" :current-page.sync="currentPageNum1" layout="total, prev, pager, next" :total="count1" @current-change="handleCurrentChange1" />
                </el-tab-pane>
                <el-tab-pane :label="'团拼 '+tabData.groupCnt" name="1">
                    <el-table :data="tableData2" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum2-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderNo" label="合约编号" align="center" />
                        <el-table-column prop="groupQuantity" label="拼单类型" align="center">
                            <template slot-scope="scope">
                                {{scope.row.groupQuantity + '人'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" align="center" />
                        <el-table-column prop="internalPrice.decimalTwoString" label="商品拼单价" align="center" />
                        <el-table-column prop="quantity" label="购买数量" align="center" />
                        <el-table-column prop="buyerPhone" label="拼单发起方" align="center" />
                        <el-table-column prop="payAmount.decimalTwoString" label="实际付款金额" align="center" />
                        <el-table-column prop="groupOrderStatus" label="拼单状态" align="center" />
                        <el-table-column prop="groupCompleteTime" label="拼单时间" align="center" />
                    </el-table>
                    <el-pagination :hide-on-single-page="true" class="pageList" :page-size="pageSize" :current-page.sync="currentPageNum2" layout="total, prev, pager, next" :total="count2" @current-change="handleCurrentChange2" />
                </el-tab-pane>
                <el-tab-pane :label="'秒杀 '+tabData.secKillCnt" name="3">
                    <el-table :data="tableData3" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum3-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderNo" label="合约编号" align="center" />
                        <el-table-column prop="goodsName" label="商品名称" align="center" />
                        <el-table-column prop="quantity" label="购买数量" align="center" />
                        <el-table-column prop="internalPrice.decimalTwoString" label="秒杀价" align="center" />
                        <el-table-column prop="freightAmount.decimalTwoString" label="物流金额" align="center" />
                        <el-table-column prop="payAmount.decimalTwoString" label="实际付款金额" align="center" />
                        <el-table-column prop="shippingName" label="收货人姓名" align="center" />
                        <el-table-column prop="shippingAddress" label="收货地址" align="center" />
                        <el-table-column prop="shippingPhone" label="收货人联系方式" align="center" />
                        <el-table-column prop="orderStatus.message" label="合约状态" align="center" />
                    </el-table>
                    <el-pagination :hide-on-single-page="true" class="pageList" :page-size="pageSize" :current-page.sync="currentPageNum3" layout="total, prev, pager, next" :total="count3" @current-change="handleCurrentChange3" />
                </el-tab-pane>
                <el-tab-pane :label="'1+2拼 '+tabData.oneTwoCnt" name="4">
                    <el-table :data="tableData4" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum4-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderNo" label="合约编号" align="center" />
                        <el-table-column prop="goodsName" label="商品名称" align="center" />
                        <el-table-column prop="quantity" label="购买数量" align="center" />
                        <el-table-column prop="internalPrice.decimalTwoString" label="商品会员价" align="center" />
                        <el-table-column prop="freightAmount.decimalTwoString" label="物流金额" align="center" />
                        <el-table-column prop="payAmount.decimalTwoString" label="实际付款金额" align="center" />
                        <el-table-column prop="shippingName" label="收货人姓名" align="center" />
                        <el-table-column prop="shippingAddress" label="收货地址" align="center" />
                        <el-table-column prop="shippingPhone" label="收货人联系方式" align="center" />
                        <el-table-column prop="orderStatus.message" label="合约状态" align="center" />
                    </el-table>
                    <el-pagination :hide-on-single-page="true" class="pageList" :page-size="pageSize" :current-page.sync="currentPageNum4" layout="total, prev, pager, next" :total="count4" @current-change="handleCurrentChange4" />
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>
<script>
import { queryUserOrderRecordList, getUserOrderRecordCnt } from '@/api/selfManage'
export default {
    name: '',
    components: {},
    data() {
        return {
            tableData1: [],
            tableData2: [],
            tableData3: [],
            tableData4: [],
            count1: 0,
            count2: 0,
            count3: 0,
            count4: 0,
            pageNum: 1,
            pageSize: 10,
            auditCount: 0,
            approvedCount: 0,
            rejectedCount: 0,
            queryParams: {
                buyerPhone: null,
                orderNo: null,
                goodsAmountStart: null,
                goodsAmountEnd: null,
                dateRange: []
            },
            form: {
                msg: ''
            },
            dialogFormVisible: false,
            status: 0,
            rowData: null,
            cancelData: '',
            groupQuantity: '',
            quantityOptions: [
                {
                    label: '全部',
                    value: null
                },
                {
                    label: '5人',
                    value: 5
                },
                {
                    label: '10人',
                    value: 10
                },
                {
                    label: '20人',
                    value: 20
                },
            ],
            groupOrderStatus: '',
            OrderOptions: [
                {
                    label: '全部',
                    value: null
                },
                {
                    label: '中奖',
                    value: 1
                },
                {
                    label: '未中奖',
                    value: 2
                },
                {
                    label: '未成团',
                    value: 3
                },
                {
                    label: '未付款',
                    value: 4
                },
            ],
            howClick: 1,
            currentPageNum1: 1,
            currentPageNum2: 1,
            currentPageNum3: 1,
            currentPageNum4: 1,
            isclickTab: 1,
            tabData: '',
            howClickArr: [0],
            settleStatus: 0
        }
    },
    created() {
        this.getList({
            limit: this.pageSize,
            page: this.pageNum,
            mallOrderType: this.settleStatus
        })
        this.getTabData()
    },
    methods: {
        getTabData() {
            getUserOrderRecordCnt().then(res => {
                if (res.success) {
                    this.tabData = res.data
                }
            })
        },
        handleClick(tab, event) {
            if (this.howClickArr.indexOf(tab.name) < 0) {
                this.howClickArr.push(tab.name)
                this.getList({
                    limit: this.pageSize,
                    page: this.pageNum,
                    mallOrderType: this.settleStatus
                })
            }

        },
        getList(params) {
            queryUserOrderRecordList(params).then(
                res => {
                    if (res.success) {
                        if (this.settleStatus == 0) {
                            this.tableData1 = res.data
                            this.count1 = res.count
                        } else if (this.settleStatus == 1) {
                            this.tableData2 = res.data
                            this.count2 = res.count
                        } else if (this.settleStatus == 3) {
                            this.tableData3 = res.data
                            this.count3 = res.count
                        } else if (this.settleStatus == 4) {
                            this.tableData4 = res.data
                            this.count4 = res.count
                        }

                    } else {
                        this.tableData0 = []
                        this.count = 0
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                        return false
                    }
                }
            )
        },
        refreshBtn() {
            if (this.settleStatus == 0) {
                this.currentPageNum1 = 1
            } else if (this.settleStatus == 1) {
                this.currentPageNum2 = 1
            } else if (this.settleStatus == 3) {
                this.currentPageNum3 = 1
            } else if (this.settleStatus == 4) {
                this.currentPageNum4 = 1
            }
            this.getList({
                page: 1,
                limit: this.pageSize,
                mallOrderType: this.settleStatus
            })
        },
        //搜索
        handleSearch() {
            if (this.settleStatus == 0) {
                this.isclickTab = 1
            } else if (this.settleStatus == 1) {
                this.isclickTab = 2
            } else if (this.settleStatus == 3) {
                this.isclickTab = 3
            } else if (this.settleStatus == 4) {
                this.isclickTab = 4
            }
            const _params = {
                page: 1,
                limit: this.pageSize,
                mallOrderType: this.settleStatus,
                groupQuantity: this.groupQuantity ? this.groupQuantity : null,
                groupOrderStatus: this.groupOrderStatus ? this.groupOrderStatus : null,
                buyerPhone: this.queryParams.buyerPhone ? this.queryParams.buyerPhone : null,
                orderNo: this.queryParams.orderNo ? this.queryParams.orderNo : null,
                goodsAmountStart: this.queryParams.goodsAmountStart ? this.queryParams.goodsAmountStart : null,
                goodsAmountEnd: this.queryParams.goodsAmountEnd ? this.queryParams.goodsAmountEnd : null,
                payTimeStart: this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[0] : null,
                payTimeEnd: this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[1] : null
            }
            this.getList(_params)
        },
        reset() {
            if (this.settleStatus == 0) {
                this.currentPageNum1 = 1
            } else if (this.settleStatus == 1) {
                this.currentPageNum2 = 1
            } else if (this.settleStatus == 3) {
                this.currentPageNum3 = 1
            } else if (this.settleStatus == 4) {
                this.currentPageNum4 = 1
            }
            this.pageSize = 10
            this.pageNum = 1
            this.groupQuantity = ''
            this.groupOrderStatus = ''
            this.queryParams.buyerPhone = ''
            this.queryParams.orderNo = ''
            this.queryParams.goodsAmountStart = ''
            this.queryParams.goodsAmountEnd = ''
            this.queryParams.dateRange = []
            this.getList({
                page: this.pageNum,
                limit: this.pageSize,
                mallOrderType: this.settleStatus
            })
        },
        // 翻页
        handleCurrentChange1(val) {
            this.currentPageNum1 = val
            var msg = {
                page: val,
                limit: this.pageSize,
                mallOrderType: this.settleStatus,
            }
            if (this.isclickTab == 1) {
                msg.groupQuantity = this.groupQuantity ? this.groupQuantity : null
                msg.groupOrderStatus = this.groupOrderStatus ? this.groupOrderStatus : null
                msg.buyerPhone = this.queryParams.buyerPhone ? this.buyerPhone.userIdentity : null
                msg.orderNo = this.queryParams.orderNo ? this.queryParams.orderNo : null
                msg.goodsAmountStart = this.queryParams.goodsAmountStart ? this.queryParams.goodsAmountStart : null
                msg.goodsAmountEnd = this.queryParams.goodsAmountEnd ? this.queryParams.goodsAmountEnd : null
                msg.payTimeStart = this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[0] : null
                msg.payTimeEnd = this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[1] : null
            }

            this.getList(msg)
        },
        handleCurrentChange2(val) {
            this.currentPageNum2 = val
            var msg = {
                page: val,
                limit: this.pageSize,
                mallOrderType: this.settleStatus,
            }
            if (this.isclickTab == 2) {
                msg.groupQuantity = this.groupQuantity ? this.groupQuantity : null
                msg.groupOrderStatus = this.groupOrderStatus ? this.groupOrderStatus : null
                msg.buyerPhone = this.queryParams.buyerPhone ? this.buyerPhone.userIdentity : null
                msg.orderNo = this.queryParams.orderNo ? this.queryParams.orderNo : null
                msg.goodsAmountStart = this.queryParams.goodsAmountStart ? this.queryParams.goodsAmountStart : null
                msg.goodsAmountEnd = this.queryParams.goodsAmountEnd ? this.queryParams.goodsAmountEnd : null
                msg.payTimeStart = this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[0] : null
                msg.payTimeEnd = this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[1] : null
            }

            this.getList(msg)
        },
        handleCurrentChange3(val) {
            this.currentPageNum3 = val
            var msg = {
                page: val,
                limit: this.pageSize,
                mallOrderType: this.settleStatus,
            }
            if (this.isclickTab == 3) {
                msg.groupQuantity = this.groupQuantity ? this.groupQuantity : null
                msg.groupOrderStatus = this.groupOrderStatus ? this.groupOrderStatus : null
                msg.buyerPhone = this.queryParams.buyerPhone ? this.buyerPhone.userIdentity : null
                msg.orderNo = this.queryParams.orderNo ? this.queryParams.orderNo : null
                msg.goodsAmountStart = this.queryParams.goodsAmountStart ? this.queryParams.goodsAmountStart : null
                msg.goodsAmountEnd = this.queryParams.goodsAmountEnd ? this.queryParams.goodsAmountEnd : null
                msg.payTimeStart = this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[0] : null
                msg.payTimeEnd = this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[1] : null
            }

            this.getList(msg)
        },
        handleCurrentChange4(val) {
            this.currentPageNum4 = val
            var msg = {
                page: val,
                limit: this.pageSize,
                mallOrderType: this.settleStatus,
            }
            if (this.isclickTab == 4) {
                msg.groupQuantity = this.groupQuantity ? this.groupQuantity : null
                msg.groupOrderStatus = this.groupOrderStatus ? this.groupOrderStatus : null
                msg.buyerPhone = this.queryParams.buyerPhone ? this.buyerPhone.userIdentity : null
                msg.orderNo = this.queryParams.orderNo ? this.queryParams.orderNo : null
                msg.goodsAmountStart = this.queryParams.goodsAmountStart ? this.queryParams.goodsAmountStart : null
                msg.goodsAmountEnd = this.queryParams.goodsAmountEnd ? this.queryParams.goodsAmountEnd : null
                msg.payTimeStart = this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[0] : null
                msg.payTimeEnd = this.queryParams.dateRange && this.queryParams.dateRange.length ? this.queryParams.dateRange[1] : null
            }

            this.getList(msg)
        }
    }
}
</script>
<style lang='scss' scoped>
.el-message-box {
    width: 500px;
}

.container ::v-deep input::-webkit-outer-spin-button,
.container ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
}

.container ::v-deep input[type="number"] {
    -moz-appearance: textfield;
}

.container {
    padding: 20px;

    .center {
        margin-top: 30px;
    }

    .pageList {
        width: 100%;
        text-align: center;
        padding: 20px 0;
    }
}

.addressBox {
    p {
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #606266;
        width: 21%;
        text-align: right;
        font-weight: bold;
        float: left;
    }

    .address {
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #606266;
        float: right;
        margin: 14px 0;
    }

    .balance {
        clear: both;
        text-align: right;
    }
}
</style>
