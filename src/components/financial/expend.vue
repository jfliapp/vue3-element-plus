<template>
    <div class='container'>
        <div class="recordHead">
            <div class="changeTime">
                <div class="changeDiv">
                    <p class="rechangeMan">结算对象钱包地址</p>
                    <el-input v-model="payAddress" type="text" placeholder="请输入钱包地址" class="changeName" />
                </div>
                <div class="changeDiv">
                    <p class="rechangeMan">交易状态</p>
                    <el-select v-model="trandStatus" placeholder="请选择">
                        <el-option v-for="item in alianceOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="changeDiv">
                    <p class="rechangeMan">时间</p>
                    <el-date-picker v-model="startEndTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
                </div>
            </div>
            <el-button class="recordBtn" @click="searchRecord">搜索</el-button>
            <el-button class="recordBtn" @click="reset">重置</el-button>
        </div>
        <div class="incomeCenter">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" align="center" width="60px">
                    <template slot-scope="scope">
                        {{ (pageNum-1)*pageSize+scope.$index+1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="orderNo" label="业务" align="center" />
                <el-table-column prop="amount.standardString" label="结算金额" align="center" />
                <el-table-column prop="settleAddress" label="结算对象钱包地址" align="center" />
                <el-table-column prop="checkStatus" label="审核状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.checkStatus == 0">待审核</span>
                        <span v-else-if="scope.row.checkStatus == 1">审核通过</span>
                        <span v-else-if="scope.row.checkStatus == 2">驳回</span>
                    </template>
                </el-table-column>
                <el-table-column prop="settleStatus" label="结算状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.settleStatus == 0">待结算</span>
                        <span v-else-if="scope.row.settleStatus == 1">已结算</span>
                        <span v-else-if="scope.row.settleStatus == 2">结算失败</span>
                    </template>
                </el-table-column>
                <el-table-column prop="applyTime" label="发起时间" align="center" />
            </el-table>
            <el-pagination v-show="totalNum > 10" class="pageList" :page-size="10" layout="total, prev, pager, next" :total="totalNum" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script>
import { expendAmountList } from '@/api/financial'

export default {
    name: '',
    components: {
    },
    data() {
        return {
            memberUID: '',
            recommendUID: '',
            trandStatus: '',
            startEndTime: '',
            alianceOptions: [
                {
                    label: '待审核',
                    value: 0
                },
                {
                    label: '审核通过',
                    value: 1
                },
                {
                    label: '驳回',
                    value: 2
                },

            ],
            tableData: [],
            totalNum: 0,
            contractNum: '',
            payAddress: '',
            pageSize: 10,
            pageNum: 1
        };
    },
    created() {
        this.getDataList({
            limit: this.pageSize,
            page: this.pageNum
        })
    },
    mounted() {
    },
    methods: {
        //列表
        getDataList(params) {
            expendAmountList(params).then(res => {
                if (res.success) {
                    this.tableData = res.data
                    this.totalNum = res.count
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].castleCount == null) {
                            this.tableData[i].castleCount = 0
                        }
                    }
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                    return
                }
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.pageNum = val
            const msg = {
                limit: this.pageSize,
                page: this.pageNum,
                checkStatus: this.trandStatus
            }

            if (this.payAddress != '') {
                msg.settleAddress = this.payAddress
            }
            if (this.startEndTime != '') {
                msg.applyTimeStart = this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[0])
                msg.applyTimeEnd = this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[1])
            }
            this.getDataList(msg)
        },
        //搜索
        searchRecord() {
            const msg = {
                limit: this.pageSize,
                page: 1,
                checkStatus: this.trandStatus
            }

            if (this.payAddress != '') {
                msg.settleAddress = this.payAddress
            }
            if (this.startEndTime != '') {
                msg.applyTimeStart = this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[0])
                msg.applyTimeEnd = this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[1])
            }
            expendAmountList(msg).then(res => {
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
            })
        },
        reset() {
            this.pageSize = 10
            this.pageNum = 1
            this.contractNum = ''
            this.trandStatus = ''
            this.payAddress = ''
            this.startEndTime = ''
            this.getDataList({
                limit: this.pageSize,
                page: this.pageNum
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
                'M+': date.getMinutes().toString(), // 分
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
        }
    },
}
</script>
<style lang='scss' scoped>
.recordHead {
    .changeTime {
        display: flex;
        margin-bottom: 20px;
        flex-wrap: wrap;
        .changeDiv {
            display: flex;
            margin-top: 20px;
        }
        // .timeNext {
        //     display: flex;
        //     margin-top: 20px;
        // }
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
.incomeCenter {
    margin-top: 40px;
    .pageList {
        text-align: center;
        margin-top: 20px;
    }
}
</style>