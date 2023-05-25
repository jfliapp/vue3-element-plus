<template>
    <div class="container">
        <h4>查看</h4>
        <ul v-if="detailList.groupNo">
            <li>
                <div>
                    <p>团购号</p>
                    <el-input type="text" v-model="detailList.groupNo" readonly></el-input>
                </div>
                <div>
                    <p>拼团类型</p>
                    <p>{{detailList.groupQuantity +'人团'}}</p>
                    <!-- <el-input type="text" v-model="detailList.groupQuantity" readonly></el-input> -->
                </div>
            </li>
            <li>
                <div>
                    <p>商品名称</p>
                    <el-input type="text" v-model="detailList.title" readonly></el-input>
                </div>
                <div>
                    <p>购买数量</p>
                    <el-input type="text" v-model="detailList.groupQuantity" readonly></el-input>
                </div>
            </li>
            <li>
                <div>
                    <p>拼拼价</p>
                    <el-input type="text" v-model="detailList.groupPrice.num" readonly></el-input>
                </div>
                <div>
                    <p>合作商结算价</p>
                    <el-input type="text" v-model="detailList.settlePrice.num" readonly></el-input>
                </div>
            </li>
            <li>
                <div>
                    <p>状态</p>
                    <el-input type="text" v-model="detailList.groupStatus" readonly></el-input>
                </div>
            </li>
        </ul>
        <h5>付款用户列表</h5>
        <el-table :data="tableData" border style="width: 100%;margin-bottom:40px">
            <el-table-column type="index" label="序号" align="center" width="80px">
            </el-table-column>
            <el-table-column prop="orderNo" label="合约编号" align="center" />
            <el-table-column prop="buyerPhone" label="手机号码" align="center" />
            <el-table-column prop="payAmount.num" label="付款金额" align="center" />
            <el-table-column prop="payTime" label="付款时间" align="center" />
            <el-table-column prop="winningStatus" label="状态" align="center" v-if="detailList.groupStatus == '已成团'">
                <template slot-scope="scope">
                    <span v-if="scope.row.winningStatus == '0'">未中奖</span>
                    <span v-else-if="scope.row.winningStatus == '1'">中奖</span>
                </template>
            </el-table-column>
            <el-table-column v-if="detailList.groupStatus == '未成团'">
                <el-table-column prop="refundTime" label="退款时间" align="center" />
                <el-table-column prop="refundAmount.num" label="退款金额" align="center" />
                <el-table-column prop="refundStatus" label="退款状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.refundStatus == '0'">未退款</span>
                        <span v-else-if="scope.row.refundStatus == '1'">退款中</span>
                        <span v-else-if="scope.row.refundStatus == '2'">退款成功</span>
                        <span v-else-if="scope.row.refundStatus == '3'">退款失败</span>
                    </template>
                </el-table-column>
            </el-table-column>

            <el-table-column v-else>
                <el-table-column prop="shippingName" label="收货人" align="center" />
                <el-table-column prop="shippingPhone" label="收货人手机号码" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.shippingPhone.substr(0,3)+'****'+scope.row.shippingPhone.substr(7,11)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="shippingAddress" label="收货地址" align="center" />
            </el-table-column>

        </el-table>
        <el-button class="backBtn" @click="$router.go(-1)">返回</el-button>
    </div>
</template>

<script>
import { mallGroupDetail } from '@/api/returnGoods'
export default {
    components: {},
    data() {
        return {
            tableData: [],
            detailList: "",
        };
    },
    created() { },
    mounted() {
        mallGroupDetail({ groupNo: this.$route.query.groupNo }).then(res => {
            if (res.success) {
                this.detailList = res.data
                this.tableData = res.data.orderList

                if (this.detailList.groupStatus == '10') {
                    this.detailList.groupStatus = '发起拼拼'
                } else if (this.detailList.groupStatus == '20') {
                    this.detailList.groupStatus = '待成团'
                } else if (this.detailList.groupStatus == '30') {
                    this.detailList.groupStatus = '已成团'
                } else if (this.detailList.groupStatus == '40') {
                    this.detailList.groupStatus = '未成团'
                }
            }
        })
    },
    methods: {

    },
};
</script>
<style lang="scss" scoped>
.container {
    padding: 0 60px;
    ul {
        list-style: none;
        padding: 0 0 30px 0;
        border-bottom: 1px solid #ccc;
        li {
            display: flex;
            div {
                display: flex;
                width: 50%;
                p {
                    width: 120px;
                }
            }
        }
    }
    h5 {
        font-size: 15px;
        color: rgb(64, 158, 255);
    }
    .backBtn {
        display: block;
        width: 150px;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 50px;
    }
}
</style>