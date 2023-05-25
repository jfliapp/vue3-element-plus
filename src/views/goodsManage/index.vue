<template>
    <div class="container">
        <div class="recordHead">
            <div class="changeTime">
                <p class="rechangeMan">商品名称</p>
                <el-input v-model="shopTitle" type="text" placeholder="请输入商品名称" class="changeName" />
                <p class="rechangeMan">商品分类</p>
                <el-select v-model="relateCate" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.goodsCategoryId" :label="item.name" :value="item.goodsCategoryId">
                    </el-option>
                </el-select>
                <p class="rechangeMan">商品模式</p>
                <el-select v-model="saleMode" placeholder="请选择">
                    <el-option v-for="item,index in saleModeArr" :key="index" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
                <div class="timeNext">
                    <p class="rechangeMan">创建时间</p>
                    <el-date-picker v-model="startEndTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm" />
                </div>
            </div>
            <el-button class="recordBtn" type="primary" icon="el-icon-search" @click="searchRecord">搜索</el-button>
            <el-button class="recordBtn" icon="el-icon-refresh" @click="reset">重置</el-button>
            <el-button icon="el-icon-refresh-right" @click="refreshBtn">刷新</el-button>
        </div>
        <div class="center">
            <div class="goods">
                <router-link to="/self-support/public">
                    <el-button type="primary" class="publicGoods">发布新商品</el-button>
                </router-link>
            </div>
            <el-tabs v-model="settleStatus" type="border-card" @tab-click="handleClick">
                <el-tab-pane :label="'待审核'+totalShop.waitAuditNum" name="WAIT_AUDIT">
                    <el-table :data="tableData2" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum1-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="商品名称" align="center" />
                        <el-table-column prop="modeList" label="商品模式" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.modeList.join()}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goodsCategoryName" label="商品分类" align="center" />
                        <el-table-column prop="partnerName" label="合作方" align="center" />
                        <el-table-column prop="stock" label="库存" align="center" />
                        <el-table-column prop="internalPrice.decimalTwoString" label="直购会员价" align="center" />
                        <el-table-column prop="internalMinPrice.decimalTwoString" label="直购券后价" align="center" />
                        <el-table-column prop="groupInternalPrice.decimalTwoString" label="团拼会员价" align="center" />
                        <el-table-column prop="groupPrice.decimalTwoString" label="团拼价" align="center" />
                        <el-table-column prop="oneTwoGroupInternalPrice.decimalTwoString" label="1+2会员价" align="center" />
                        <el-table-column prop="oneTwoGroupPrice.decimalTwoString" label="1+2团拼价" align="center" />
                        <el-table-column prop="marketPrice.decimalTwoString" label="市场价" align="center" />
                        <el-table-column prop="settlePrice.decimalTwoString" label="结算价" align="center" />
                    
                        <!-- <el-table-column prop="status.message" label="状态" align="center" /> -->
                        <el-table-column prop='' label="操作" align="center">
                            <template slot-scope="scope">
                                <div style="display:flex;justify-content: center;">
                                    <el-button type="text" @click="checkDetail(scope.row)">查看</el-button>
                                    <el-button type="text" @click="goodsChange(scope.row)">修改</el-button>
                                    <el-button type="text" @click="goodsUp(scope.row)">上架</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination :hide-on-single-page='true' class="pageList" :page-size="10" :current-page='currentPageNum2' layout="total, prev, pager, next" :total="totalNum2" @current-change="handleCurrentChange2" />
                </el-tab-pane>
                <el-tab-pane :label="'已上架'+totalShop.upNum" name="UP">
                    <el-table :data="tableData0" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum0-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="商品名称" align="center" />
                        <el-table-column prop="modeList" label="商品模式" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.modeList.join()}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goodsCategoryName" label="商品分类" align="center" />
                        <el-table-column prop="partnerName" label="合作方" align="center" />
                        <el-table-column prop="stock" label="库存" align="center" />
                        <el-table-column prop="internalPrice.decimalTwoString" label="直购会员价" align="center" />
                        <el-table-column prop="internalMinPrice.decimalTwoString" label="直购券后价" align="center" />
                        <el-table-column prop="groupInternalPrice.decimalTwoString" label="团拼会员价" align="center" />
                        <el-table-column prop="groupPrice.decimalTwoString" label="团拼价" align="center" />
                        <el-table-column prop="oneTwoGroupInternalPrice.decimalTwoString" label="1+2会员价" align="center" />
                        <el-table-column prop="oneTwoGroupPrice.decimalTwoString" label="1+2团拼价" align="center" />
                        <el-table-column prop="marketPrice.decimalTwoString" label="市场价" align="center" />
                        <el-table-column prop="settlePrice.decimalTwoString" label="结算价" align="center" />
                        <!-- <el-table-column prop="status.message" label="状态" align="center" /> -->
                        <el-table-column prop='' label="操作" align="center">
                            <template slot-scope="scope">
                                <div style="display:flex;justify-content: center;">
                                    <el-button type="text" @click="checkDetail(scope.row)">查看</el-button>
                                    <el-button type="text" @click="goodsDown(scope.row)">下架</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination :hide-on-single-page='true' class="pageList" :page-size="10" :current-page='currentPageNum0' layout="total, prev, pager, next" :total="totalNum0" @current-change="handleCurrentChange0" />
                </el-tab-pane>
                <el-tab-pane :label="'已下架'+totalShop.downNum" name="DOWN">
                    <el-table :data="tableData1" border style="width: 100%">
                        <el-table-column type="index" label="序号" align="center" width="80px">
                            <template slot-scope="scope">
                                {{ (currentPageNum1-1)*pageSize+scope.$index+1 }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="商品名称" align="center" />
                        <el-table-column prop="modeList" label="商品模式" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.row.modeList.join()}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goodsCategoryName" label="商品分类" align="center" />
                        <el-table-column prop="partnerName" label="合作方" align="center" />
                        <el-table-column prop="stock" label="库存" align="center" />
                        <el-table-column prop="internalPrice.decimalTwoString" label="直购会员价" align="center" />
                        <el-table-column prop="internalMinPrice.decimalTwoString" label="直购券后价" align="center" />
                        <el-table-column prop="groupInternalPrice.decimalTwoString" label="团拼会员价" align="center" />
                        <el-table-column prop="groupPrice.decimalTwoString" label="团拼价" align="center" />
                        <el-table-column prop="oneTwoGroupInternalPrice.decimalTwoString" label="1+2会员价" align="center" />
                        <el-table-column prop="oneTwoGroupPrice.decimalTwoString" label="1+2团拼价" align="center" />
                        <el-table-column prop="marketPrice.decimalTwoString" label="市场价" align="center" />
                        <el-table-column prop="settlePrice.decimalTwoString" label="结算价" align="center" />
                        <!-- <el-table-column prop="status.message" label="状态" align="center" /> -->
                        <el-table-column prop='' label="操作" align="center">
                            <template slot-scope="scope">
                                <div style="display:flex;justify-content: center;">
                                    <el-button type="text" @click="checkDetail(scope.row)">查看</el-button>
                                    <el-button type="text" @click="goodsChange(scope.row)">修改</el-button>
                                    <el-button type="text" @click="goodsUp(scope.row)">上架</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination :hide-on-single-page='true' class="pageList" :page-size="10" :current-page='currentPageNum1' layout="total, prev, pager, next" :total="totalNum1" @current-change="handleCurrentChange1" />
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>
<script>
import { goodsList, auditUp, auditDown, editStock, categoryAll } from '@/api/chain'
export default {
    name: '',
    components: {
    },
    data() {
        return {
            startEndTime: '',
            shopTitle: '',
            recommendUID: '',
            tableData0: [],
            tableData1: [],
            tableData2: [],
            totalNum0: 0,
            totalNum1: 0,
            totalNum2: 0,
            pageNum: 1,
            pageSize: 10,
            detailList: '',
            leadName: '',
            recommendUIDName: '',
            recommdId: '',
            manageList: '',
            totalShop: '',
            options: [],
            relateCate: '',
            saleMode: '',
            saleModeArr: [
                {
                    name: '直购',
                    value: 'DIRECT'
                },
                {
                    name: '拼团',
                    value: 'GROUP'
                },
                {
                    name: '1加2拼团',
                    value: 'ONE_TWO_GROUP'
                },
            ],
            settleStatus: 'WAIT_AUDIT',
            howClickArr: ['WAIT_AUDIT'],
            currentPageNum0: 1,
            currentPageNum1: 1,
            currentPageNum2: 1,
            modeList: []
        }
    },
    activated() {
        this.goodsManageList({
            limit: this.pageSize,
            page: this.pageNum,
            status: this.settleStatus
        })
        this.categorylist()
    },
    created() {
        this.goodsManageList({
            limit: this.pageSize,
            page: this.pageNum,
            status: this.settleStatus
        })
        this.categorylist()
    },
    methods: {
        categorylist() {
            categoryAll().then(res => {
                if (res.success) {
                    this.options = res.data
                }
            })
        },

        // 商品上架
        goodsUp(item) {
            this.$confirm('请确认该商品是否上架? 上架后，将立刻在应用前台展现', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                auditUp({ goodsId: item.goodsId }).then(res => {
                    if (res.success) {
                        this.$message({
                            message: '上架成功',
                            type: 'success'
                        })
                        this.$router.go(0)
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'warning'
                        })
                    }
                })
            }).catch(() => { })
        },
        // 下架
        goodsDown(item) {
            this.$confirm('请确认该商品是否下架? 下架后，该商品将立刻在应用前台隐藏', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                auditDown({ goodsId: item.goodsId }).then(res => {
                    if (res.success) {
                        this.$message({
                            message: '下架成功',
                            type: 'success'
                        })
                        this.$router.go(0)
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'warning'
                        })
                    }
                })
            }).catch(() => { })
        },
        changeStock(item) {
            this.$prompt('商品库存修改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'number',
                inputValue: item.stock,
                closeOnClickModal: false
            }).then(({ value }) => {
                editStock({ goodsId: item.goodsId, stock: value }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '你的库存数是: ' + value
                    })
                    this.$router.go(0)
                })
            }).catch(() => {
            })
        },
        goodsChange(item) {
            this.$router.push({
                path: '/self-support/public',
                query: {
                    goodsDetail: JSON.stringify(item),
                    type: 'edit'
                }
            })
        },
        checkDetail(item) {
            this.$router.push({
                path: '/self-support/public',
                query: {
                    'goodsDetail': JSON.stringify(item),
                    isDetail: true,
                    type: 'see'
                }
            })
        },
        // 确定修改推荐人
        changeEnsure() {
            if (this.recommdId == '') {
                this.$message({
                    message: '请输入推荐人UID',
                    type: 'warning'
                })
                return
            }
            updateUserRecommend({ recommendId: this.recommdId, userId: this.detailList.userId }).then(res => {
                if (res.success) {
                    this.$message({
                        message: '修改推荐人成功',
                        type: 'success'
                    })
                    setTimeout(() => {
                        this.$router.go(0)
                    }, 1500)
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                    return
                }
            })
        },
        handleClick(tab) {
            if (this.howClickArr.indexOf(tab.name) < 0) {
                this.howClickArr.push(tab.name)
                this.goodsManageList({
                    limit: this.pageSize,
                    page: this.pageNum,
                    status: this.settleStatus
                })
            }
        },
        refreshBtn() {
            if (this.settleStatus == 'UP') {
                this.currentPageNum0 = 1
            } else if (this.settleStatus == 'DOWN') {
                this.currentPageNum1 = 1
            }
            this.goodsManageList({
                limit: this.pageSize,
                page: 1,
                status: this.settleStatus
            })
        },
        // 搜索
        searchRecord() {
            if (this.settleStatus == 'UP') {
                this.currentPageNum0 = 1
            } else if (this.settleStatus == 'DOWN') {
                this.currentPageNum1 = 1
            }
            const msg = {
                limit: this.pageSize,
                page: 1,
                status: this.settleStatus,
                title: this.shopTitle ? this.shopTitle : null,
                startTime: this.startEndTime[0] ? this.startEndTime[0] : null,
                endTime: this.startEndTime[1] ? this.startEndTime[1] : null,
                goodsCategoryId: this.relateCate ? this.relateCate : null,
                saleMode: this.saleMode ? this.saleMode : null
            }
            this.goodsManageList(msg)
        },
        reset() {
            this.shopTitle = ''
            this.startEndTime = ''
            this.relateCate = ''
            this.saleMode = ''
            this.pageNum = 1
            this.pageSize = 10
            this.goodsManageList({
                limit: this.pageSize,
                page: this.pageNum,
                status: this.settleStatus
            })
        },
        // 记录列表
        goodsManageList(msg) {
            goodsList(msg).then(res => {
                if (res.success) {
                    if (this.settleStatus == 'UP') {
                        this.tableData0 = res.data
                        this.totalNum0 = res.count
                    } else if (this.settleStatus == 'DOWN') {
                        this.tableData1 = res.data
                        this.totalNum1 = res.count
                    } else if (this.settleStatus == 'WAIT_AUDIT') {
                        this.tableData2 = res.data
                        this.totalNum2 = res.count
                    }

                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].modeList = []
                        if (res.data[i].directMode) {
                            res.data[i].modeList.push('直购')
                        }
                        if (res.data[i].groupMode) {
                            res.data[i].modeList.push('团拼')
                        }
                        if (res.data[i].oneTwoGroupMode) {
                            res.data[i].modeList.push('1+2拼')
                        }
                    }
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
        handleCurrentChange0(val) {
            this.currentPageNum0 = val
            var msg = {
                limit: this.pageSize,
                page: val,
                status: this.settleStatus
            }
            if (this.settleStatus == 'UP') {
                msg.title = this.shopTitle ? this.shopTitle : null
                msg.startTime = this.startEndTime[0] ? this.startEndTime[0] : null
                msg.endTime = this.startEndTime[1] ? this.startEndTime[1] : null
                msg.goodsCategoryId = this.relateCate ? this.relateCate : null
                msg.saleMode = this.saleMode ? this.saleMode : null
            }
            this.goodsManageList(msg)
        },
        handleCurrentChange1(val) {
            this.currentPageNum1 = val
            var msg = {
                limit: this.pageSize,
                page: val,
                status: this.settleStatus
            }
            if (this.settleStatus == 'DOWN') {
                msg.title = this.shopTitle ? this.shopTitle : null
                msg.startTime = this.startEndTime[0] ? this.startEndTime[0] : null
                msg.endTime = this.startEndTime[1] ? this.startEndTime[1] : null
                msg.goodsCategoryId = this.relateCate ? this.relateCate : null
                msg.saleMode = this.saleMode ? this.saleMode : null
            }
            this.goodsManageList(msg)
        },
        handleCurrentChange2(val) {
            this.currentPageNum1 = val
            var msg = {
                limit: this.pageSize,
                page: val,
                status: this.settleStatus
            }
            if (this.settleStatus == 'WAIT_AUDIT') {
                msg.title = this.shopTitle ? this.shopTitle : null
                msg.startTime = this.startEndTime[0] ? this.startEndTime[0] : null
                msg.endTime = this.startEndTime[1] ? this.startEndTime[1] : null
                msg.goodsCategoryId = this.relateCate ? this.relateCate : null
                msg.saleMode = this.saleMode ? this.saleMode : null
            }
            this.goodsManageList(msg)
        },
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
.addSelect {
    background: #409eff !important;
    color: #fff !important;
}
.container {
    padding: 20px;
    .center {
        margin-top: 30px;
        .goods {
            display: flex;
            margin-bottom: 10px;
            .el-button {
                margin-right: 50px;
                width: 120px;
            }
            .goodUl {
                display: flex;
                list-style: none;
                padding: 0;
                margin: 0;
                cursor: pointer;
                li {
                    width: 120px;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #eee;
                    text-align: center;
                    font-size: 15px;
                    border-radius: 4px;
                    margin-right: 20px;
                }
            }
        }
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
            margin-right: 40px;
        }
    }
    .pageList {
        width: 100%;
        text-align: center;
        padding: 20px 0;
    }
}
</style>
