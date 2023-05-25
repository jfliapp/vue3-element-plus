<template>
  <div class="container">
    <div class="recordHead">
      <div class="changeTime">
        <p class="rechangeMan">合约编号</p>
        <el-input v-model="orderNo" type="number" placeholder="0-20个字符" class="changeName" />
        <p class="rechangeMan">买方PID</p>
        <el-input v-model="buyerId" type="number" placeholder="0-20个字符" class="changeName" />
        <p class="rechangeMan">发放状态</p>
        <el-select v-model="issueStatus" placeholder="请选择发放状态">
          <el-option
            v-for="(value, key, index) in issueState"
            :key="index"
            :label="value"
            :value="key"
          />
        </el-select>
        <div class="timeNext">
          <p class="rechangeMan">创建时间</p>
          <el-date-picker
            v-model="startEndTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>
      <el-button class="recordBtn" @click="searchRecord">搜索</el-button>
      <el-button class="recordBtn" @click="reset">重置</el-button>
    </div>
    <div class="center">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="80" >
          <template slot-scope="scope">
              {{ (page-1)*limit+scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="合约编号" align="center" />
        <el-table-column prop="goodsName" label="商品名称" align="center" />
        <el-table-column prop="internalPrice" label="内购价" align="center">
          <template slot-scope="scope">
            {{ scope.row.internalPrice.standardString }}
          </template>
        </el-table-column>
        <el-table-column prop="settlePrice" label="结算价" align="center">
          <template slot-scope="scope">
            {{ scope.row.settlePrice.standardString }}
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="购买数量" align="center" />
        <el-table-column prop="payAmount" label="实际付款金额" align="center">
          <template slot-scope="scope">
            {{ scope.row.payAmount.standardString }}
          </template>
        </el-table-column>
        <el-table-column prop="commissionTotalUsdtAmount" label="佣金发放总金额" align="center">
          <template slot-scope="scope">
            {{ scope.row.commissionTotalUsdtAmount.standardString }}
          </template>
        </el-table-column>
        <el-table-column prop="issueStatus" label="发放状态" align="center">
          <template slot-scope="scope">
            {{ issueState[scope.row.issueStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="orderId" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
            >
              <router-link :to="'/commission/detail?id='+scope.row.commissionId+'&&nowPage='+page">查看</router-link>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="totalNum > 50"
        class="pageList"
        :page-size="50"
        :current-page="page"
        layout="total, prev, pager, next"
        :total="totalNum"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getCommissionList } from '@/api/chain'

export default {
  name: '',
  components: {},
  data() {
    return {
      startEndTime: [],
      orderNo: null,
      buyerId: null,
      tableData: [],
      totalNum: 0,
      limit: 50,
      page: 1,
      issueStatus: null,
      issueState: {
        '1': '未发送',
        '2': '正在发放',
        '3': '已发放'
      }
    }
  },
  created() {
    if(this.$route.query.hasPageNum){
        this.page = this.$route.query.hasPageNum
    }
    this.getList({
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    getList(params) {
      getCommissionList(params).then(
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
        limit: this.limit,
        page: 1,
        orderNo: this.orderNo ? this.orderNo : null,
        buyerId: this.buyerId ? this.buyerId : null,
        issueStatus: this.issueStatus ? this.issueStatus : null,
        createTimeStart: this.startEndTime && this.startEndTime.length ? this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[0]) : null,
        createTimeEnd: this.startEndTime && this.startEndTime.length ? this.dateFormat('YYYY-mm-dd HH:MM', this.startEndTime[1]) : null
      })
    },
    reset() {
      this.orderNo = null
      this.buyerId = null
      this.issueStatus = null
      this.startEndTime = []
      this.searchRecord()
    },
    // 列表
    handleCurrentChange(val) {
      this.page = val
      this.getList({
        page: val,
        limit: this.limit,
        orderNo: this.orderNo ? this.orderNo : null,
        buyerId: this.buyerId ? this.buyerId : null,
        issueStatus: this.issueStatus ? this.issueStatus : null,
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
      return `${val.substring(0, 3)}**********${val.substring(val.length - 4)}`
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
      margin-bottom: 20px;
      flex-wrap: wrap;

      .timeNext {
        display: flex;
      }
    }

    .changeName {
      width: 240px;
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
}
</style>
