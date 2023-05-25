<template>
    <div class='container'>
        <div class="recordHead">
            <div class="changeTime">
                <div class="changeDiv">
                    <p class="rechangeMan">合约编号</p>
                    <el-input v-model="contractNum" type="text" placeholder="请输入合约编号" class="changeName" />
                </div>
                <div class="changeDiv">
                    <p class="rechangeMan">商品名称</p>
                    <el-input v-model="goodName" type="text" placeholder="请输入商品名称" class="changeName" />
                </div>
                <div class="changeDiv">
                    <p class="rechangeMan">供应商类型</p>
                    <el-select v-model="trandStatus" placeholder="请选择">
                        <el-option v-for="item in alianceOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div class="changeDiv">
                    <p class="rechangeMan">付款方钱包地址</p>
                    <el-input v-model="payAddress" type="text" placeholder="请输入钱包地址" class="changeName" />
                </div>
                <div class="changeDiv">
                    <p class="rechangeMan">付款方身份名</p>
                    <el-input v-model="payName" type="text" placeholder="请输入付款方身份名" class="changeName" />
                </div>
                <div class="changeDiv">
                    <p class="rechangeMan">交易时间</p>
                    <el-date-picker v-model="startEndTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"  value-format="yyyy-MM-dd HH:mm:ss" />
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
                <el-table-column prop="orderNo" label="合约编号" align="center" />

                <el-table-column prop="goodsName" label="商品名称" align="center" />
                <el-table-column prop="supplierType" label="供应商类型" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.supplierType == 0">个人</span>
                        <span v-else-if="scope.row.supplierType == 1">公司</span>
                    </template>
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" align="center" />
                <el-table-column prop="payAmount.decimalFourString" label="合约金额" align="center" />
                <el-table-column prop="payAmount.decimalFourString" label="用户实际付款金额" align="center" />
                <el-table-column prop="buyerWalletAddress" label="付款方钱包地址" align="center" />
                <el-table-column prop="buyerWalletName" label="付款方身份名" align="center" />
                <el-table-column prop="settleAmount.decimalFourString" label="货款金额" align="center" />
                <el-table-column prop="commissionAmount.decimalFourString" label="市场佣金" align="center" />
                <el-table-column prop="incomeAmount.decimalFourString" label="收入金额" align="center" />
                <el-table-column prop="createTime" label="收入时间" align="center" />
            </el-table>
            <el-pagination v-show="totalNum > 10" class="pageList" :page-size="10" layout="total, prev, pager, next" :total="totalNum" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script>
import { selfGoodsAmountList } from '@/api/financial'

export default {
    name: '',
    components: {
    },
    data() {
        return {
            trandStatus: '',
            startEndTime: '',
            alianceOptions: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '个人',
                    value: '0'
                },
                {
                    label: '企业',
                    value: '1'
                },
            ],
            tableData: [],
            totalNum: 0,
            contractNum: '',
            goodName: '',
            payAddress: '',
            payName: '',
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
            selfGoodsAmountList(params).then(res => {
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
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.pageNum = val
             this.pageNum = val
            const msg = {
                limit: this.pageSize,
                page: this.pageNum,
                orderNo: this.contractNum ? this.contractNum : null,
                goodsName: this.goodName ? this.goodName : null,
                supplierType: this.trandStatus ? this.trandStatus : '',
                buyerWalletName: this.payName ? this.payName : null,
                buyerWalletAddress: this.payAddress ? this.payAddress : null,
                createTimeStart: this.startEndTime ? this.startEndTime[0] : null,
                createTimeEnd: this.startEndTime ? this.startEndTime[1] : null
            }
            this.getDataList(msg)
        },
        //搜索
        searchRecord() {
            const msg = {
                limit: this.pageSize,
                page: 1,
                orderNo: this.contractNum ? this.contractNum : null,
                goodsName: this.goodName ? this.goodName : null,
                supplierType: this.trandStatus ? this.trandStatus : '',
                buyerWalletName: this.payName ? this.payName : null,
                buyerWalletAddress: this.payAddress ? this.payAddress : null,
                createTimeStart: this.startEndTime ? this.startEndTime[0] : null,
                createTimeEnd: this.startEndTime ? this.startEndTime[1] : null
            }
            selfGoodsAmountList(msg).then(res => {
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
            this.payName = ''
            this.goodName = ''
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
    .pageList{
        text-align: center;
        margin-top: 20px;
    }
}
</style>