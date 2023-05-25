<template>
    <div class="detail_container">
        <ul class="inf clearfix" v-if="info">
            <li style="width: 100%">
                <span>商品名称：</span>
                <em>{{ info && info.goodsName }}</em>
            </li>
            <li>
                <span>合约编号：</span>
                <em>{{ info && info.orderNo }}</em>
            </li>
            <li>
                <span>合约类型：</span>
                <em>{{ info.orderType == 'DIRECT'? '直购':info.orderType == 'GROUP'? '团购':'转卖'  }}</em>
            </li>
            <li>
                <span>购买数量：</span>
                <em>{{ info && info.quantity }}</em>
            </li>
            <li>
                <span>会员价：</span>
                <em>{{ info.totalAmount && info.totalAmount.decimalTwoString }}</em>
            </li>
            <li>
                <span>会员实际付款金额：</span>
                <em>{{ info && info.payAmount && info.payAmount.decimalTwoString }}</em>
            </li>
            <li>
                <span>合作商结算价：</span>
                <em>{{ info.settleAmount && info.settleAmount.decimalTwoString }}</em>
            </li>
            <div v-if="info.orderStatus.message == '交易成功'||info.orderStatus.message == '已发货'">
                <li>
                    <span>物流公司：</span>
                    <em>{{ info.trackingCompany}}</em>
                </li>
                <li>
                    <span>物流单号：</span>
                    <em>{{ info.trackingNumber }}</em>
                </li>
            </div>

            <li>
                <span>状态：</span>
                <em>
                    {{ info.orderStatus.message }}
                    <el-button type="primary" style="padding: 10px 20px;margin-left: 20px" 
                    v-if="info.orderStatus.code != 60 && info.orderStatus.code != 20 && info.orderStatus.code != 80" @click="handleUpdate()">退货
                    </el-button>
                </em>
            </li>
            <li style="width: 100%">
                <el-divider />
            </li>
            <li>
                <span>买方手机号：</span>
                <em>{{ info && info.buyerPhone }}</em>
            </li>
            <li>
                <span>收货人姓名：</span>
                <em>{{ info && info.shippingName }}</em>
            </li>
            <li>
                <span>收货人手机号：</span>
                <em>{{ info && info.shippingPhone }}</em>
            </li>
            <li>
                <span>收货人地址：</span>
                <em>{{ info && info.shippingAddress }}</em>
            </li>
            <li style="width: 100%">
                <el-divider />
            </li>
            <li style="width: 100%;text-align: center">
                <el-button style="padding: 15px 50px" @click="goBack">返回</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
import {
    getContractDetail,
    refundApply
} from '@/api/chain'

export default {
    name: '',
    data() {
        return {
            info: null,
            REQ_STATUS: {
                '10': '待付款',
                '20': '已付款',
                '30': '已发货',
                '50': '交易成功',
                '60' : '退货申请'
            }
        }
    },
    created() {
        /** 详情 */
        this.getDetail({
            orderId: this.$route.query.id
        })
    },
    mounted() {
    },
    methods: {
        getDetail(params) {
            getContractDetail(params).then((response) => {
                if (response && response.data) {
                    this.info = response.data
                }
            })
        },
        goBack() {
            this.$router.go(-1)
            // this.$router.push({
            //     path: '/contract/list',
            //     query:{
            //         hasPageNum:this.$route.query.nowPage
            //     }
            // })
        },
        handleUpdate(data) {
            this.$confirm('请确认是否退货?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                refundApply({ orderId: this.$route.query.id }).then((res) => {
                    if (res.success) {
                        this.$router.go(-1)
                        this.$message({
                            message: '退货成功',
                            type: 'success'
                        })
                    }
                })
            })

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
</style>
