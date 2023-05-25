<template>
    <div class='container'>
        <div class="recordHead">
            <div class="changeTime">
                <p class="rechangeMan">发起人</p>
                <el-input v-model="sponsorPhone" type="text" placeholder="请输入商品名称" class="changeName" />
                <p class="rechangeMan">拼团类型</p>
                <el-select v-model="groupQuantity" placeholder="请选择">
                    <el-option v-for="item in QuantityOptions" :key="item.value" :label="item.label" :value="item.value" class="changeName">
                    </el-option>
                </el-select>
                <!-- <p class="rechangeMan">合约状态</p>
                <el-select v-model="groupStatus" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" class="changeName">
                    </el-option>
                </el-select> -->
                <div class="timeNext">
                    <p class="rechangeMan">创建时间</p>
                    <el-date-picker v-model="startEndTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" />
                </div>
            </div>
            <el-button class="recordBtn" type="primary" icon="el-icon-search" @click="searchRecord">搜索</el-button>
            <el-button class="recordBtn" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button class="recordBtn" icon="el-icon-refresh-right" @click="refreshBtn">刷新</el-button>

            <el-button type="primary" icon="el-icon-download" @click="exportOrder">合约导出</el-button>
        </div>
        <div class="center">
            <el-tabs v-model="settleStatus" type="border-card" @tab-click="handleClick">
                <el-tab-pane :label="'等待成团'+totalRow.waitCnt" name="20">
                    <el-table :data="tableData1" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum1-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="groupNo" label="团购号" align="center" />
                        <el-table-column prop="groupQuantity" label="拼团类型" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.groupQuantity+"人团"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sponsorPhone" label="发起人" align="center">
                            <template slot-scope="scope">
                                {{ filterID(scope.row.sponsorPhone) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="商品名称" align="center" />
                        <el-table-column prop="settlePrice.num" label="合作商结算价" align="center" />
                        <el-table-column prop="groupPrice.num" label="拼拼价" align="center" />
                        <el-table-column prop="groupQuantity" label="购买数量" align="center" />
                        <el-table-column prop="joinQuantity" label="买方" align="center" />
                        <el-table-column prop="payAmount.num" label="实际付款金额" align="center" />
                        <el-table-column prop="groupStatus" label="交易状态" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.groupStatus == '10'">发起拼拼</span>
                                <span v-else-if="scope.row.groupStatus == '20'">待成团</span>
                                <span v-else-if="scope.row.groupStatus == '30'">已成团</span>
                                <span v-else-if="scope.row.groupStatus == '40'">未成团</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="startTime" label="创建时间" align="center" />
                        <el-table-column label="操作" align="center" width="180" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" @click="checkDetail(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pageList" :current-page='currentPageNum1' @current-change="handleCurrentChange1" :hide-on-single-page='true' :page-size='10' layout="total, prev, pager, next" :total="totalNum1">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane :label="'已成团'+totalRow.successCnt" name="30">
                    <el-table :data="tableData2" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum2-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="groupNo" label="团购号" align="center" />
                        <el-table-column prop="groupQuantity" label="拼团类型" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.groupQuantity+"人团"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sponsorPhone" label="发起人" align="center">
                            <template slot-scope="scope">
                                {{ filterID(scope.row.sponsorPhone) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="商品名称" align="center" />
                        <el-table-column prop="settlePrice.num" label="合作商结算价" align="center" />
                        <el-table-column prop="groupPrice.num" label="拼拼价" align="center" />
                        <el-table-column prop="groupQuantity" label="购买数量" align="center" />
                        <el-table-column prop="joinQuantity" label="买方" align="center" />
                        <el-table-column prop="payAmount.num" label="实际付款金额" align="center" />
                        <el-table-column prop="groupStatus" label="交易状态" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.groupStatus == '10'">发起拼拼</span>
                                <span v-else-if="scope.row.groupStatus == '20'">待成团</span>
                                <span v-else-if="scope.row.groupStatus == '30'">已成团</span>
                                <span v-else-if="scope.row.groupStatus == '40'">未成团</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="startTime" label="创建时间" align="center" />
                        <el-table-column label="操作" align="center" width="180" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" @click="checkDetail(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pageList" :current-page.sync='currentPageNum2' @current-change="handleCurrentChange2" :hide-on-single-page='true' :page-size='10' layout="total, prev, pager, next" :total="totalNum2">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane :label="'未成团'+totalRow.failCnt" name="40">
                    <el-table :data="tableData3" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum3-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="groupNo" label="团购号" align="center" />
                        <el-table-column prop="groupQuantity" label="拼团类型" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.groupQuantity+"人团"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sponsorPhone" label="发起人" align="center">
                            <template slot-scope="scope">
                                {{ filterID(scope.row.sponsorPhone) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="商品名称" align="center" />
                        <el-table-column prop="settlePrice.num" label="合作商结算价" align="center" />
                        <el-table-column prop="groupPrice.num" label="拼拼价" align="center" />
                        <el-table-column prop="groupQuantity" label="购买数量" align="center" />
                        <el-table-column prop="joinQuantity" label="买方" align="center" />
                        <el-table-column prop="payAmount.num" label="实际付款金额" align="center" />
                        <el-table-column prop="groupStatus" label="交易状态" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.groupStatus == '10'">发起拼拼</span>
                                <span v-else-if="scope.row.groupStatus == '20'">待成团</span>
                                <span v-else-if="scope.row.groupStatus == '30'">已成团</span>
                                <span v-else-if="scope.row.groupStatus == '40'">未成团</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="startTime" label="创建时间" align="center" />
                        <el-table-column label="操作" align="center" width="180" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" @click="checkDetail(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pageList" :current-page.sync='currentPageNum3' @current-change="handleCurrentChange3" :hide-on-single-page='true' :page-size='10' layout="total, prev, pager, next" :total="totalNum3">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>
<script>
import { listMallGroupBoss, exportMallGroupBoss, getMallGroupOrderCnt } from '@/api/returnGoods'
import fileDownload from 'js-file-download'
export default {
    name: 'partnerFinancialSettlement',
    components: {
    },
    data() {
        return {
            sponsorPhone: '',
            startEndTime: '',
            tableData1: [],
            tableData2: [],
            tableData3: [],
            totalNum1: 0,
            totalNum2: 0,
            totalNum3: 0,
            pageNum: 1,
            pageSize: 10,
            options: [
                {
                    value: '10',
                    label: '发起拼拼'
                }, {
                    value: '20',
                    label: '待成团'
                }, {
                    value: '30',
                    label: '已成团'
                }, {
                    value: '40',
                    label: '未成团'
                },
            ],
            groupStatus: '',
            QuantityOptions: [
                {
                    value: 5,
                    label: '5人团'
                }, {
                    value: 10,
                    label: '10人团'
                }, {
                    value: 20,
                    label: '20人团'
                },
            ],
            groupQuantity: '',
            settleStatus: '20',
            howClickArr: ['20'],
            totalRow: '',
            isclickTab: '',
            currentPageNum1: 1,
            currentPageNum2: 1,
            currentPageNum3: 1,
        };
    },
    created() {
        this.searchTableList({
            limit: this.pageSize,
            page: this.pageNum,
            groupStatus: this.settleStatus
        })
        this.getLab()
    },
    methods: {
        refreshBtn() {
            if (this.settleStatus == 20) {
                this.currentPageNum1 = 1
            } else if (this.settleStatus == 30) {
                this.currentPageNum2 = 1
            } else if (this.settleStatus == 40) {
                this.currentPageNum3 = 1
            }
            this.searchTableList({
                limit: this.pageSize,
                page: 1,
                groupStatus: this.settleStatus
            })
        },
        getLab() {
            getMallGroupOrderCnt().then(res => {
                if (res.success) {
                    this.totalRow = res.data
                }
            })
        },
        handleClick(tab) {
            if (this.howClickArr.indexOf(tab.name) < 0) {
                this.howClickArr.push(tab.name)
                this.searchTableList({
                    limit: this.pageSize,
                    page: this.pageNum,
                    groupStatus: this.settleStatus
                })
            }
        },
        //导出合约
        exportOrder() {
            let today = new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate();
            let data = {
                sponsorPhone: this.sponsorPhone ? this.sponsorPhone : null,
                groupQuantity: this.groupQuantity ? this.groupQuantity : null,
                groupStatus: this.settleStatus,
                createTimeStart: this.startEndTime[0] ? this.startEndTime[0] : null,
                createTimeEnd: this.startEndTime[1] ? this.startEndTime[1] : null
            }
            exportMallGroupBoss(data).then(res => {
                fileDownload(res, `合约-${today}.xlsx`)
            })
        },
        checkDetail(item) {
            this.$router.push({
                path: '/self-support/contract/CollageManage/detail',
                query: item
            })
        },
        //重置
        reset() {
            if (this.settleStatus == 20) {
                this.currentPageNum1 = 1
            } else if (this.settleStatus == 30) {
                this.currentPageNum2 = 1
            } else if (this.settleStatus == 40) {
                this.currentPageNum3 = 1
            }
            this.sponsorPhone = ''
            this.startEndTime = ''
            // this.groupStatus = ''
            this.groupQuantity = ''
            this.pageNum = 1
            this.pageSize = 10
            this.searchTableList({
                limit: this.pageSize,
                page: this.pageNum,
                groupStatus: this.settleStatus,
            })
        },
        // 搜索
        searchRecord() {
            if (this.settleStatus == 20) {
                this.isclickTab = 2
            } else if (this.settleStatus == 30) {
                this.isclickTab = 3
            } else if (this.settleStatus == 40) {
                this.isclickTab = 4
            }
            const msg = {
                limit: this.pageSize,
                page: 1,
                groupStatus: this.settleStatus,
                sponsorPhone: this.sponsorPhone ? this.sponsorPhone : null,
                groupQuantity: this.groupQuantity ? this.groupQuantity : null,
                createTimeStart: this.startEndTime[0] ? this.startEndTime[0] : null,
                createTimeEnd: this.startEndTime[1] ? this.startEndTime[1] : null
            }
            this.searchTableList(msg)
        },
        // 查询表格数据
        searchTableList(data) {
            listMallGroupBoss(data).then(res => {
                if (res.success) {
                    if (this.settleStatus == '20') {
                        this.tableData1 = res.data
                        this.totalNum1 = res.count
                    } else if (this.settleStatus == '30') {
                        this.tableData2 = res.data
                        this.totalNum2 = res.count
                    } else if (this.settleStatus == '40') {
                        this.tableData3 = res.data
                        this.totalNum3 = res.count
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
        // 切换页码
        handleCurrentChange1(val) {
            this.currentPageNum1 = val
            var msg = {
                limit: this.pageSize,
                page: val,
                groupStatus: this.settleStatus,
            }
            if (this.isclickTab == 2) {
                msg.sponsorPhone = this.sponsorPhone ? this.sponsorPhone : null
                msg.buyerPhone = this.buyerPhone ? this.buyerPhone : null
                msg.groupQuantity = this.groupQuantity ? this.groupQuantity : null
                msg.createTimeStart = this.startEndTime[0] ? this.startEndTime[0] : null
                msg.createTimeEnd = this.startEndTime[1] ? this.startEndTime[1] : null
            }
            this.searchTableList(msg)
        },
        handleCurrentChange2(val) {
            this.currentPageNum2 = val
            var msg = {
                limit: this.pageSize,
                page: val,
                groupStatus: this.settleStatus,
            }
            if (this.isclickTab == 3) {
                msg.sponsorPhone = this.sponsorPhone ? this.sponsorPhone : null
                msg.buyerPhone = this.buyerPhone ? this.buyerPhone : null
                msg.groupQuantity = this.groupQuantity ? this.groupQuantity : null
                msg.createTimeStart = this.startEndTime[0] ? this.startEndTime[0] : null
                msg.createTimeEnd = this.startEndTime[1] ? this.startEndTime[1] : null
            }
            this.searchTableList(msg)

        },
        handleCurrentChange3(val) {
            this.currentPageNum3 = val
            var msg = {
                limit: this.pageSize,
                page: val,
                groupStatus: this.settleStatus,
            }
            if (this.isclickTab == 4) {
                msg.sponsorPhone = this.sponsorPhone ? this.sponsorPhone : null
                msg.buyerPhone = this.buyerPhone ? this.buyerPhone : null
                msg.groupQuantity = this.groupQuantity ? this.groupQuantity : null
                msg.createTimeStart = this.startEndTime[0] ? this.startEndTime[0] : null
                msg.createTimeEnd = this.startEndTime[1] ? this.startEndTime[1] : null
            }
            this.searchTableList(msg)

        },
        filterID(val) {
            if (val) {
                return `${val.substring(0, 3)}****${val.substring(val.length - 4)}`
            }
        }
    },
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
ul {
    list-style: none;
    padding: 0;
}
.container {
    padding: 20px;
    .center {
        margin-top: 20px;
    }
    .recordHead {
        .changeTime {
            display: flex;
            margin-bottom: 20px;
            flex-wrap: wrap;
            .timeNext {
                display: flex;
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
            margin-right: 20px;
        }
    }
    .pageList {
        width: 100%;
        text-align: center;
        padding: 20px 0;
    }
    .editBtn {
        margin-right: 10px;
    }

    .agreeAlter {
        .hasSend {
            text-align: center;
            margin: 10px 0 40px;
            display: block;
            font-size: 16px;
        }
        h5 {
            margin: 10px 0 20px;
            font-size: 16px;
        }
        ul > li {
            display: flex;
            margin-bottom: 20px;
            p {
                width: 100px;
                flex-shrink: 0;
            }
        }
        .agreeArea {
            width: 100%;
            margin-bottom: 20px;
            ::v-deep .el-textarea__inner {
                height: 100px;
            }
        }
        .agreeBtn {
            text-align: center;
            .el-button {
                width: 100px;
            }
        }
    }
}
</style>