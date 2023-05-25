<template>
    <div class="container">
        <div class="recordHead">
            <div class="changeTime">
                <p class="rechangeMan">合约编号</p>
                <el-input v-model="orderNo" type="text" placeholder="0-20个字符" class="changeName" />
                <p class="rechangeMan">买方手机号码</p>
                <el-input v-model="buyPhoneNum" type="number" placeholder="请输入手机号" class="changeName" />
                <p class="rechangeMan">合约类型</p>
                <el-select v-model="subOrderType" placeholder="请选择订单状态" class="mr_bottom_20">
                    <el-option v-for="item in orderTypeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <p class="rechangeMan">合约状态</p>
                <el-select v-model="orderStatus" placeholder="请选择订单状态" class="mr_bottom_20">
                    <el-option v-for="(value, key, index) in orderState" :key="index" :label="value" :value="key" />
                </el-select>
                <div class="timeNext">
                    <p class="rechangeMan">创建时间</p>
                    <el-date-picker v-model="startEndTime" type="datetimerange" range-separator="至" class="mr_bottom_20" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" />
                </div>
            </div>
            <el-button type="primary" icon="el-icon-search" @click="searchRecord">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button type="primary" icon="el-icon-download" @click="exportOrder">合约导出</el-button>
        </div>
        <div class="center">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" type="index" width="80">
                    <template slot-scope="scope">
                        {{ (page-1)*limit+scope.$index+1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="orderNo" label="合约编号" align="center" />
                <el-table-column prop="goodsName" label="商品名称" align="center" />
                <el-table-column prop="orderType" label="合约类型" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.orderType == 0">直购</span>
                        <span v-if="scope.row.orderType == 3">秒杀</span>
                    </template>
                </el-table-column>
                <el-table-column prop="settleAmount.decimalTwoString" label="合作商结算价" align="center" />
                <el-table-column prop="totalAmount.decimalTwoString" label="会员价" align="center" />
                <el-table-column prop="quantity" label="购买数量" align="center" />
                <el-table-column prop="buyerPhone" label="买方手机号码" align="center">
                    <template slot-scope="scope">
                        {{ filterID(scope.row.buyerPhone) }}
                    </template>
                </el-table-column>
                <el-table-column prop="payAmount" label="实际付款金额" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.payAmount.decimalTwoString }}
                    </template>
                </el-table-column>
                <el-table-column prop="cashCouponDeduction.decimalTwoString" label="代金券抵扣金额" align="center" />
                <el-table-column prop="tpDeduction.decimalTwoString" label="TP积分抵扣金额" align="center" />


                <el-table-column prop="orderStatus.message" label="交易状态" align="center" />
                <el-table-column prop="createTime" label="创建时间" align="center" />
                <el-table-column prop="orderId" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text">
                            <router-link :to="'/self-support/contract/detail?id='+scope.row.orderId+'&&nowPage='+page">查看</router-link>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalNum > 10" class="pageList" :page-size="10" :current-page='page' layout="total, prev, pager, next" :total="totalNum" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script>
import { getContracts, exportExcel } from '@/api/chain'
import fileDownload from 'js-file-download'
export default {
    name: '',
    components: {},
    data() {
        return {
            startEndTime: [],
            orderNo: null,
            buyPhoneNum: null,
            tableData: [],
            totalNum: 0,
            page: 1,
            limit: 10,
            orderStatus: null,
            orderState: {
                '10': '待付款',
                '20': '已付款',
                '30': '已发货',
                '50': '交易成功'
            },
            subOrderType: '',
            orderTypeList: [
                {
                    value: null,
                    label: '全部'
                },
                {
                    value: '0',
                    label: '直购'
                },
                {
                    value: '3',
                    label: '秒杀'
                },
            ]
        }
    },
    created() {
        if (this.$route.query.hasPageNum) {
            this.page = this.$route.query.hasPageNum
        }
        this.getList({
            page: this.page,
            limit: this.limit
        })
    },
    methods: {
        exportOrder() {
            let today = new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate();
            let data = {
                // page: this.page,
                // limit: this.limit,
                orderNo: this.orderNo ? this.orderNo : null,
                buyerPhone: this.buyPhoneNum ? this.buyPhoneNum : null,
                orderStatus: this.orderStatus ? this.orderStatus : null,
                createTimeStart: this.startEndTime && this.startEndTime.length ? this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[0]) : null,
                createTimeEnd: this.startEndTime && this.startEndTime.length ? this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[1]) : null
            }
            exportExcel(data).then(res => {
                fileDownload(res, `合约-${today}.xlsx`)
            })
        },
        getList(params) {
            getContracts(params).then(
                res => {
                    if (res.success) {
                        this.tableData = res.data
                        this.totalNum = res.count
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                        return
                    }
                }
            )
        },
        searchRecord() {
            this.getList({
                page: 1,
                limit: this.limit,
                orderNo: this.orderNo ? this.orderNo : null,
                buyerPhone: this.buyPhoneNum ? this.buyPhoneNum : null,
                orderStatus: this.orderStatus ? this.orderStatus : null,
                subOrderType: this.subOrderType ? this.subOrderType : null,
                createTimeStart: this.startEndTime && this.startEndTime.length ? this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[0]) : null,
                createTimeEnd: this.startEndTime && this.startEndTime.length ? this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[1]) : null
            })
        },
        reset() {
            this.orderNo = null
            this.buyPhoneNum = null
            this.orderStatus = null
            this.subOrderType= null
            this.startEndTime = []
            this.searchRecord()
        },
        // 分页
        handleCurrentChange(val) {
            this.page = val
            this.getList({
                page: val,
                limit: this.limit,
                orderNo: this.orderNo ? this.orderNo : null,
                buyerPhone: this.buyPhoneNum ? this.buyPhoneNum : null,
                orderStatus: this.orderStatus ? this.orderStatus : null,
                subOrderType: this.subOrderType ? this.subOrderType : null,
                createTimeStart: this.startEndTime && this.startEndTime.length ? this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[0]) : null,
                createTimeEnd: this.startEndTime && this.startEndTime.length ? this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[1]) : null
            })
        },
        dateFormat(fmt, date) {
            let ret = ''
            date = new Date(date)
            const opt = {
                'Y+': date.getFullYear().toString(), // 年
                'm+': (date.getMonth() + 1).toString(), // 月
                'd+': date.getDate().toString(), // 日
                'H+': date.getHours().toString(), // 时
                'M+': date.getMinutes().toString() // 分
                // 'S+': date.getSeconds().toString() // 秒
            }
            for (const k in opt) {
                ret = new RegExp('(' + k + ')').exec(fmt)
                if (ret) {
                    fmt = fmt.replace(
                        ret[1],
                        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
                    )
                }
            }
            return fmt
        },
        filterID(val) {
            if (val) {
                return `${val.substring(0, 3)}****${val.substring(val.length - 4)}`
            }
        }
    }
}
</script>
<style lang='scss' scoped>
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
        margin-top: 20px;
    }

    .recordHead {
        .changeTime {
            display: flex;
            margin-bottom: 0px;
            flex-wrap: wrap;

            .timeNext {
                display: flex;
            }
        }

        .changeName {
            width: 240px;
            margin-bottom: 20px;
        }
        .mr_bottom_20 {
            margin-bottom: 20px;
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
            margin-right: 0px;
            background: #1890ff;
            color: #fff;
        }
        .expert {
            // background: #ffba00;
            width: 155px;
        }
    }

    .pageList {
        width: 100%;
        text-align: center;
        padding: 20px 0;
    }
}
</style>
