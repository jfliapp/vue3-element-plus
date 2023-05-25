<template>
  <div class="detail_container">
    <ul class="inf clearfix">
      <li style="width: 100%">
        <span>商品名称：</span>
        <em>{{ info && info.goodsName }}</em>
      </li>
      <li>
        <span>合约编号：</span>
        <em>{{ info && info.orderNo }}</em>
      </li>
      <li>
        <span>内购价：</span>
        <em>{{ info && info.internalPrice && info.internalPrice.standardString }}</em>
      </li>
      <li>
        <span>市场价：</span>
        <em>{{ info && info.marketPrice && info.marketPrice.standardString }}</em>
      </li>
      <li>
        <span>会员实际付款金额：</span>
        <em>{{ info && info.payAmount && info.payAmount.standardString }}</em>
      </li>
      <li>
        <span>结算价：</span>
        <em>{{ info && info.settlePrice && info.settlePrice.standardString }}</em>
      </li>
      <li>
        <span>购买数量：</span>
        <em>{{ info && info.quantity }}</em>
      </li>
      <li>
        <span>佣金金额：</span>
        <em>{{ info && info.commissionTotalUsdtAmount && info.commissionTotalUsdtAmount.standardString }}</em>
      </li>
      <li>
        <span>商品是否返佣：</span>
        <em>{{ info && info.supportCommission?'是':'否' }}</em>
      </li>
      <li>
        <span>商品是否给TP奖励：</span>
        <em>{{ info && info.supportTpReward?'是':'否' }}</em>
      </li>
      <li>
        <span>合约状态：</span>
        <em>{{ info && info.orderStatus && ORDER_STATUS[info.orderStatus] }}</em>
      </li>
      <li>
        <span>佣金发放状态：</span>
        <em>{{ info && info.issueStatus && REQ_STATUS[info.issueStatus] }}</em>
      </li>
      <li>
        <span>合约创建时间：</span>
        <em>{{ info && info.createTime }}</em>
      </li>
      <li>
        <span>佣金发放时间：</span>
        <em>{{ info && info.issueTime }}</em>
      </li>
      <li style="width: 100%">
        <el-divider />
      </li>
    </ul>
    <div class="list">
      <h4>佣金和奖励明细</h4>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="commissionType" label="奖励类型">
          <template slot-scope="scope">
            {{ COM_TYPE[scope.row.commissionType] }}
          </template>
        </el-table-column>
        <el-table-column prop="commissionUsdtAmount" label="佣金金额(USDT)">
          <template slot-scope="scope">
            {{ scope.row.commissionUsdtAmount.standardString }}
          </template>
        </el-table-column>
        <el-table-column prop="commissionTpAmount" label="奖励金额(TPROBE)">
          <template slot-scope="scope">
            {{ scope.row.commissionTpAmount.standardString }}
          </template>
        </el-table-column>
        <el-table-column prop="pid" label="PID" />
        <el-table-column prop="userPhone" label="手机号">
          <template slot-scope="scope">
            {{ filterID(scope.row.userPhone) }}
          </template>
        </el-table-column>
        <el-table-column prop="userIdentity" label="联盟身份">
          <template slot-scope="scope">
            {{ USER_IDENTITY[scope.row.userIdentity] }}
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-button style="padding: 15px 50px" @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCommissionDetail
} from '@/api/chain'

export default {
  name: '',
  data() {
    return {
      info: null,
      REQ_STATUS: {
        '1': '未发放',
        '2': '正在发放',
        '3': '已发放'
      },
      COM_TYPE: {
        '1': '直推奖励',
        '2': '管理城主奖励',
        '3': '管理国王奖励',
        '4': '孵化城主奖励',
        '5': '购买者奖励'
      },
      USER_IDENTITY: {
        '0': '国王',
        '1': '城主',
        '2': '居民',
        '3': '游客'
      },
      ORDER_STATUS: {
        '10': '待付款',
        '20': '已付款',
        '30': '已发货',
        '50': '交易成功'
      },
      tableData: []
    }
  },
  created() {
    /** 详情 */
    this.getDetail({
      commissionId: this.$route.query.id
    })
  },
  mounted() {
  },
  methods: {
    getDetail(params) {
      getCommissionDetail(params).then((response) => {
        if (response && response.data) {
          this.info = response.data
          this.tableData = response.data.commissionItemDtoList.length && response.data.commissionItemDtoList.length && response.data.commissionItemDtoList
        }
      })
    },
    goBack() {
      this.$router.push({
        path: '/commission/manage',
        query:{
            hasPageNum:this.$route.query.nowPage
        }
      })
    },
    filterID(val) {
      return `${val.substring(0, 3)}****${val.substring(val.length - 4)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.inf {
  list-style: none;
  font-size: 14px;
  height: 40px;
  padding: 0 100px;

  li {
    float: left;
    line-height: 50px;
    width: 50%;

    span {
      margin-right: 5px;
    }

    em {
      font-style: normal;
      color: #1890ff;
    }
  }
}

.list {
  padding: 50px 100px 0 100px;

  h4 {
    font-size: 14px;
    clear: left;
  }

  .btn {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
}

</style>
