<template>
    <div class="container">
        <div class="recordHead">
            <div class="changeTime">
                <p class="rechangeMan">会员手机号码</p>
                <el-input v-model="userName" type="text" placeholder="0-20个字符" class="changeName" />
                <p class="rechangeMan">归属运营商</p>
                <el-input v-model="agentName" type="number" placeholder="请输入手机号" class="changeName" />
                <p class="rechangeMan">会员等级</p>
                <el-select v-model="orderStatus" placeholder="请选择">
                    <el-option v-for="(item,index) in MemberState" :key="index" :label="item.label" :value="item.value" />
                </el-select>
                <div class="timeNext">
                    <p class="rechangeMan">创建时间</p>
                    <el-date-picker v-model="startEndTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" />
                </div>
            </div>
            <el-button class="recordBtn" @click="searchRecord">搜索</el-button>
            <el-button class="recordBtn" @click="reset">重置</el-button>
        </div>
        <div class="center">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" type="index" width="80">
                    <template slot-scope="scope">
                        {{ (page-1)*limit+scope.$index+1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="会员手机号码" align="center" />
                <el-table-column prop="level" label="会员等级" align="center" />
                <el-table-column prop="agentName" label="归属运营商" align="center" />
                <el-table-column prop="recommendPhone" label="推荐人手机号码" align="center">
                    <template slot-scope="scope">
                        {{ filterID(scope.row.recommendPhone) }}
                    </template>
                </el-table-column>
                <el-table-column prop="recommendUserIdentity" label="推荐人会员身份" align="center" />
                <el-table-column prop="recommendLevel" label="推荐人会员等级" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" />
                <el-table-column prop="orderId" label="操作" align="center">
                    <template slot-scope="scope">
                        <div style="display:flex;justify-content: center;">
                            <el-button type="text" @click="operation(scope.row,'see')">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-show="totalNum > 50" class="pageList" :page-size="50" :current-page='page' layout="total, prev, pager, next" :total="totalNum" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script>
import { userList } from '@/api/member'
export default {
    name: '',
    components: {},
    data() {
        return {
            startEndTime: [],
            userName: null,
            agentName: null,
            tableData: [],
            totalNum: 0,
            page: 1,
            limit: 10,
            orderStatus: null,
            MemberState: [{
                value: '1',
                label: '青铜'
            }, {
                value: '2',
                label: '白银'
            }, {
                value: '3',
                label: '白金'
            }, {
                value: '4',
                label: '黄金'
            }, {
                value: '5',
                label: '铂金'
            },
            {
                value: '6',
                label: '钻石'
            }],
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
        operation(item,str) {
            this.$router.push({
                path: '/memberMange/details',
                query: {
                    detail: JSON.stringify(item),
                    type:str,
                }
            })
        },
        exportOrder() {
            let today = new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate();
            exportExcel().then(res => {
                fileDownload(res, `待发货订单-${today}.xlsx`)
            })
        },
        getList(params) {
            userList(params).then(
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
            this.page = 1
            this.getList({
                page: 1,
                limit: this.limit,
                userName: this.userName ? this.userName : null,
                agentName: this.agentName ? this.agentName : null,
                level: this.orderStatus ? this.orderStatus : null,
                startTime: this.startEndTime && this.startEndTime.length ? this.startEndTime[0]: null,
                endTime: this.startEndTime && this.startEndTime.length ? this.startEndTime[1]: null
            })
        },
        reset() {
            this.userName = null
            this.buyPhoneNum = null
            this.orderStatus = null
            this.startEndTime = []
            this.searchRecord()
        },
        // 列表
        handleCurrentChange(val) {
            this.page = val
            this.getList({
                page: val,
                limit: this.limit,
                userName: this.userName ? this.userName : null,
                agentName: this.agentName ? this.agentName : null,
                level: this.orderStatus ? this.orderStatus : null,
                startTime: this.startEndTime && this.startEndTime.length ? this.startEndTime[0]: null,
                endTime: this.startEndTime && this.startEndTime.length ? this.startEndTime[1]: null
            })
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
        margin-top: 30px;
    }

    .recordHead {
        .changeTime {
            display: flex;
            flex-wrap: wrap;
            .timeNext {
                display: flex;
            }
        }

        .changeName {
            width: 200px;
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
            margin-right: 40px;
            background: #1890ff;
            color: #fff;
        }
        .expert {
            background: #ffba00;
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
