<template>
    <div class='container'>
        <div class="center">
            <div class="title">查看会员详情</div>
            <el-table :data="tableData" border style="width: 60%">
                <el-table-column prop="lable" fixed label="基本字段" align="center" />
                <el-table-column prop="value" label="基本信息" align="center" />
            </el-table>
            <div class="footer_box">
                <div class="btn_box">
                    <el-button class="btnOne" @click="backShop">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { searchPartnerSettleDetail } from '@/api/autarkyManage/partnerFinancialSettlement'
import { getUserDetail } from '@/api/member'

import searchBox from "@/components/searchBox/searchBox.vue";

export default {
    name: '',
    components: {
        searchBox,
    },
    data() {
        return {
            tableData: [
                {
                    lable:'手机号码',
                    key:'userName',
                    value:''
                },
                {
                    lable:'创建时间',
                    key:'createTime',
                    value:''
                },
                {
                    lable:'推荐人手机号码',
                    key:'recommendPhone',
                    value:''
                },
                {
                    lable:'推荐人会员身份',
                    key:'recommendUserIdentity',
                    value:''
                },
                {
                    lable:'推荐人会员等级',
                    key:'recommendLevel',
                    value:''
                },
                {
                    lable:'关联运营商',
                    key:'agentName',
                    value:''
                },
                {
                    lable:'管理关系会员数量',
                    key:'num',
                    value:''
                },
            ],
        };
    },
    created() {
        if (this.$route.query.detail) {
            this.detailList = JSON.parse(this.$route.query.detail)
        }
        this.searchTableList()
    },
    methods: {
        backShop() {
            this.$router.push({
                path: '/memberMange/index',
            })
        },
        // 查询表格数据
        searchTableList() {
			const data = {
				userId: this.detailList.userId
			}
            getUserDetail(data).then(res => {
                console.log(res)
                if (res.success) {
                    this.tableData.forEach(e=>{
                        e.value = res.data[e.key]
                        if(e.key == 'recommendLevel'){
                            if(res.data.recommendUserIdentity != '会员'){
                                e.value = '--'
                            }
                        }

                    })
                    // this.tableData = res.data
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                    return
                }
            })
        },
    },
}
</script>
<style lang='scss' scoped>
.container ::v-deep input::-webkit-outer-spin-button, .container ::v-deep input::-webkit-inner-spin-button{
    -webkit-appearance: none !important
}
.container ::v-deep input[type='number']{
    -moz-appearance: textfield
}
.container {
    padding: 20px;
    .btnOne{
        width: 100px;
    }
    .center{
        margin-top: 30px;
        .title{
            text-align: center;
            margin-bottom: 30px;
        }
        .el-table {
            margin: 0px auto;
        }
        .footer_box {
            padding-bottom: 30px;
            .btn_box {
                width: 100%;
                text-align: center;
                margin: 40px 0;
                .btnOne {
                    width: 140px;
                    margin: 0 30px;
                }
            }
        }
    }
}
</style>