<template>
    <div class="container"> 
        <h4 class="pageTitle">{{ $route.query.type == 'see'?'查看':$route.query.type=='edit'?'编辑':'新增' }}</h4>
        <div class="content">
            <div class="form_data">
                <el-form ref='formRef' :disabled="$route.query.type == 'see'?true:false" :model="partnerInfo" :rules="partnerRules" class="" label-width="160px">
                    <el-row >
                        <el-col :span="12">
                            <el-form-item label="合约编号">
                                <el-input v-model="partnerInfo.orderNo" placeholder="请输入合作商全称" maxlength="50" type="text" class="headInput" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合约简称">
                                <el-input v-model="partnerInfo.goodsName" placeholder="请输入合作商简称" maxlength="50" type="text" class="headInput" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="12">
                            <el-form-item label="会员价">
                                <el-input v-model="partnerInfo.totalAmount.decimalTwoString" placeholder="请输入合作商联系方式" class="headInput" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="购买数量">
                                <el-input v-model="partnerInfo.quantity" placeholder="请输入合作商联系方式" class="headInput" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="12">
                            <el-form-item label="会员实际付款金额">
                                <el-input v-model="partnerInfo.payAmount.decimalTwoString" placeholder="请输入合作商联系方式" class="headInput" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="商品佣金总金额">
                                <el-input v-model="partnerInfo.commissionCnyAmount.decimalTwoString" placeholder="请输入合作商联系方式" class="headInput" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="table_box">
                <p class="title">佣金发放明细</p>
                <el-table v-if="$route.query.type == 'see'?true:false" :data="tableData" border style="width: 100%">
                    <el-table-column prop="rewardTypeName" label="奖励类型" align="center" />
                    <el-table-column prop="rewardAmount.decimalTwoString" label="佣金金额" align="center" />
                    <el-table-column prop="rewardUserPhone" label="会员手机号码" align="center" />
                    <el-table-column prop="rewardIdentityName" label="会员身份" align="center" />
                    <el-table-column prop="rewardLevelName" :formatter="formatterRewardLevelName" label="会员等级" align="center" />
                    <el-table-column prop="baseName" :formatter="formatterBaseName" label="运营商/基地名称" align="center" />
                </el-table>
                <el-pagination v-if="$route.query.type == 'see'?true:false" class="pageList" :page-size="10" :current-page='pageNum' layout="total, prev, pager, next" :total="totalNum" @current-change="handleCurrentChange" />
                <div class="footer_box">
                    <div class="btn_box">
                        <!-- <el-button v-if="$route.query.type != 'see'" type="primary" class="btnOne" @click="unsureBtn">确认</el-button> -->
                        <el-button class="btnOne" @click="backShop">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { searchCommissionDetail } from '@/api/autarkyManage/distributionCommissionManage'

import { addPartner,searchPartnerDetail,searchProvince,searchCity,getPartnerGoodsList} from '@/api/partnerManage'
export default {
    name: '',
    components: {
    },
    data() {
        const accountNoPASS = (rule, value, callback) => {
            if (/^\s*$/.test(value)) {
                callback(new Error('支付宝账户名不能为空'))
            } else {
                callback()
            }
        }
        const namePASS = (rule, value, callback) => {
            if (/^\s*$/.test(value)) {
                callback(new Error('合作商全称不能为空'))
            } else {
                if (!/^\s*[\s\S]{1,50}\s*$/.test(value)) {
                callback(new Error('合作商全称最大长度50个字'))
                }
                callback()
            }
        }
        const shortNamePASS = (rule, value, callback) => {
            if (/^\s*$/.test(value)) {
                callback(new Error('合作商简称不能为空'))
            } else {
                if (!/^\s*[\s\S]{1,20}\s*$/.test(value)) {
                callback(new Error('合作商简称最大长度20个字'))
                }
                callback()
            }
        }
        const contactNamePASS = (rule, value, callback) => {
            if (/^\s*$/.test(value)) {
                callback(new Error('合作商联系人不能为空'))
            } else {
                if (!/^\s*[\s\S]{1,20}\s*$/.test(value)) {
                callback(new Error('合作商联系人最大长度20个字'))
                }
                callback()
            }
        }
        const contactPhonePASS = (rule, value, callback) => {
			if (/^\s*$/.test(value)) {
				callback(new Error('合作商联系方式不能为空'))
			}else {
			    if (!/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|17[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/.test(value)) {
                    callback(new Error('合作商联系方式错误'))
                }
                callback()
            }
        }
        return {
            // 底部查询合作商关联商品 start
            tableData:[],
            totalNum: 0,
            pageNum: 1,
            pageSize: 10,
            // 底部查询合作商关联商品 end

            firstFalg:true,
            firstCity:'',
            partnerRules: {
				settlementCycle: [
					{ required: true, message: '请选择合作商结算周期', trigger: 'change' }
				],
                city: [
					{ required: true, message: '请选择城市', trigger: 'change' }
				],
                accountNo: [
					{
						required: true,
						trigger: 'blur',
						validator: accountNoPASS
					}
				],
				name: [
					{
						required: true,
						trigger: 'blur',
						validator: namePASS
					}
				],
                shortName: [
					{
						required: true,
						trigger: 'blur',
						validator: shortNamePASS
					}
				],
                contactName: [
					{
						required: true,
						trigger: 'blur',
						validator: contactNamePASS
					}
				],
                contactPhone: [
					{
						required: true,
						trigger: 'blur',
						validator: contactPhonePASS
					}
				],
			},
            cityList: [],
            provinceList: [],
            // 合作商信息
            partnerInfo:{
                totalAmount:{
                    decimalTwoString:''
                },
                payAmount:{
                    decimalTwoString:''
                },
                commissionCnyAmount:{
                    decimalTwoString:''
                }
            },
            imageUrl: [],
            imgList: [],
            detailList: [],
            loading:false,
        }
    },
    watch:{
        'partnerInfo.province'(oldval){
            this.partnerInfo.city = ''
            this.cityList = []
            this.getCity(oldval)
        },
    },
    
    created() {
        if (this.$route.query.detail) {
            this.detailList = JSON.parse(this.$route.query.detail)
            this.getPartnerDetail()
        }
        // if (this.$route.query.type == 'see') {
        //     this.searchPartnerGoodsList()
        // }
        this.getProvince()
    },
    methods: {
        formatterRewardLevelName(row){
            let str = '--'
            if(row.rewardIdentity == 0){
                str = row.rewardLevelName
            }
            return str
        },
        formatterBaseName(row){
            let str = '--'
            if(row.baseName){
                str = row.baseName
            }
            return str
        },
        // 页码
        handleCurrentChange(val) {
            this.pageNum = val
            this.searchPartnerGoodsList()
        },
        // 查询合作商管理商品
        searchPartnerGoodsList() {
            let data = {}
            data.partnerId = this.detailList.partnerId
            data.limit = this.pageSize
            data.page = this.pageNum
            getPartnerGoodsList(data).then(res => {
                if (res.success) {
                    this.tableData = res.data
                    this.totalNum = res.count
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
        // 获取城市
        getCity(id) {
            searchCity(id).then(res => {
                if (res.success) {
                    this.cityList = res.data
                    if (this.firstFalg){
                        this.partnerInfo.city = this.firstCity
                        this.firstFalg = false
                    }
                }
            })
        },
        // 获取省份
        getProvince() {
            searchProvince().then(res => {
                if (res.success) {
                    this.provinceList = res.data
                }
            })
        },
        // 返回
        backShop() {
            this.$router.push({
                path: '/self-support/distributionCommissionManage',
            })
        },
        // 查询详情
        getPartnerDetail() {
            searchCommissionDetail({ orderNo: this.detailList.orderNo }).then(res => {
                if (res.success) {
                    this.partnerInfo = res.data
                    this.tableData = res.data.pointsItemList
                } else{
                    
                }
            })
        },
        // 图片上传
        handleAvatarSuccess1(res) {
            if (res.success) {
                this.imageUrl=res.data.webUrl
            } else {
                this.$message({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        // 图片移除
        handleRemove1(file, fileList) {
            this.imgList = []
            this.imageUrl = ''
        },
        // 上传拦截
        beforeAvatarUpload(file) {
            const isPic = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png')
            const isLt2M = file.size / 1024 / 1024 < 3
            if (!isPic) {
                this.$message.error('请上传格式为JPG, JPEG, PNG的图片')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 3MB!')
            }
            return isPic && isLt2M
        },
        // 确定
        unsureBtn() {
            if(this.imageUrl){
                const msg = {
                    name: this.partnerInfo.name,
                    province: this.partnerInfo.province,
                    city: this.partnerInfo.city,
                    shortName: this.partnerInfo.shortName,
                    contactName: this.partnerInfo.contactName,
                    contactPhone: this.partnerInfo.contactPhone,
                    settlementCycle: this.partnerInfo.settlementCycle,
                    integralName: this.partnerInfo.integralName,
                    accountNo: this.partnerInfo.accountNo,
                    assetsType: this.partnerInfo.assetsType,
                    licensePhoto: this.imageUrl,
                }
                this.$refs['formRef'].validate((valid) => {
                    if (valid) {
                        if (this.detailList.length < 1) {
                            addPartner(msg).then(res => {
                                if (res.success) {
                                    this.$message({
                                        message: '新增成功',
                                        type: 'success'
                                    })
                                    this.$router.push({
                                        path: '/self-support/partnerManage'
                                    })
                                } else {
                                    this.$message({
                                        message: res.message,
                                        type: 'error'
                                    })
                                }
                            })
                        } else {
                            msg.partnerId = this.detailList.partnerId
                            addPartner(msg).then(res => {
                                if (res.success) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                    this.$router.push({
                                        path: '/self-support/partnerManage'
                                    })
                                } else {
                                    this.$message({
                                        message: res.message,
                                        type: 'error'
                                    })
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            } else {
                this.$message({
                    message: '请上传合作商营业执照',
                    type: 'warning'
                })
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
    padding: 20px 100px 20px 20px;
    p {
        margin: 0;
    }
    ul {
        list-style: none;
    }
    .pageTitle {
        margin: 0 0 20px;
    }
    .addRed {
        color: #ff0000;
    }
    .content {
        width: 100%;
        .form_data {
            .province{
                width: 50%;
                margin-right: 10px;
            }
            .city{
                width: calc(50% - 10px);
            }
        }
        .public_center {
            padding-bottom: 30px;
            // border-bottom: 1px solid #ccc;
            .bannerImg {
                display: flex;
                padding: 0px 50px 10px 84px;
                box-sizing: border-box;
                .bannerP {
                    width: 140px;
                }
                .uploadImg {
                    p {
                        color: #ccc;
                        padding-bottom: 10px;
                    }
                }
            }
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
        .table_box{
            padding: 0px 0px 0px 40px;
            .title{
                // text-align: right;
                font-size: 16px;
                color: #606266;
                margin-bottom: 20px;
                font-weight: 700;
            }
        }
    }
    .pageList {
        width: 100%;
        text-align: center;
        padding: 20px 0;
    }
}
</style>
