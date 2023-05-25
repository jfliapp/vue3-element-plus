<template>
    <div class="container">
        <h4 class="goodsTitle">{{ $route.query.type=='see'?'查看':$route.query.type=='edit'?'编辑':'新增' }}商品</h4>
        <div class="publicGoods">
            <div class="goodsBasic">
                商品基础资料
            </div>
            <div class="public_head">
                <ul>
                    <li>
                        <p><span>*</span>合作商</p>
                        <el-select v-model="partnerName" :disabled="$route.query.isDetail" filterable remote reserve-keyword placeholder="请输入合作商" :remote-method="remoteMethod" :loading="loading" class="headInput">
                            <el-option v-for="item in partnerArr" :key="item.partnerId" :label="item.name" :value="item.partnerId">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <p><span>*</span>商品分类</p>
                        <el-select v-model="goodsCategory" :disabled="$route.query.isDetail" placeholder="请选择商品分类" class="headInput">
                            <el-option v-for="item in cateOptions" :key="item.goodsCategoryId" :label="item.name" :value="item.goodsCategoryId">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <p><span>*</span>商品标题</p>
                        <el-input v-model="goodsTitle" :disabled="$route.query.isDetail" placeholder="2-50个字符" maxlength="50" type="text" class="headInput" />
                    </li>
                    <li>
                        <p><span>*</span>副标题</p>
                        <el-input v-model="secondTitle" :disabled="$route.query.isDetail" placeholder="2-50个字符" maxlength="50" type="text" class="headInput" />
                    </li>
                    <li>
                        <p><span>*</span>市场价</p>
                        <el-input v-model="marketPrice" :disabled="$route.query.isDetail" placeholder="最大为10000000" type="number" class="headInput" />
                    </li>
                    <li>
                        <p><span>*</span>商品结算价</p>
                        <el-input v-model="settlePrice" :disabled="$route.query.isDetail" placeholder="最大为10000000" type="number" class="headInput" />
                    </li>
                    <!-- <li>
                        <p><span>*</span>会员价</p>
                        <el-input v-model="internalPrice" :disabled="$route.query.isDetail" type="number" class="headInput" />
                    </li> -->
                    <li>
                        <p><span>*</span>库存</p>
                        <el-input v-model="goodsStock" :disabled="$route.query.isDetail" placeholder="最大为10000000" type="number" class="headInput" />
                    </li>
                    <li>
                        <p><span>*</span>是否推荐</p>
                        <el-radio-group v-model="recommendTag" :disabled="$route.query.isDetail">
                            <el-radio :label="0">不推荐</el-radio>
                            <el-radio :label="1">推荐（推荐必须是我们亲自验证过的好货）</el-radio>
                        </el-radio-group>
                    </li>
                </ul>
            </div>
            <div class="goodsBasic">
                商品规格
            </div>
            <addSpecs :specsArr="specsArr" :isDisableSpecs="$route.query.isDetail" />
            <div class="goodsBasic">
                物流配置
            </div>
            <div class="logisticsSet">
                <div class="normalSent">
                    <p>常规物流</p>
                    <el-input v-model="logisticsAmount" :disabled="$route.query.isDetail" type="number" class="headInput" />
                </div>
                <ul>
                    <li>
                        <p style="padding-right:30px">偏远地区 </p>
                        <el-checkbox-group v-model="remoteAreaList" :disabled="$route.query.isDetail">
                            <el-checkbox label="甘肃"></el-checkbox>
                            <el-checkbox label="新疆"></el-checkbox>
                            <el-checkbox label="内蒙古"></el-checkbox>
                            <el-checkbox label="青海"></el-checkbox>
                            <el-checkbox label="西藏"></el-checkbox>
                            <el-checkbox label="宁夏"></el-checkbox>
                            <el-checkbox label="海南"></el-checkbox>
                        </el-checkbox-group>
                    </li>
                    <!-- <li>偏远地区包括：甘肃、新疆、内蒙古、青海、西藏、宁夏、海南</li> -->
                    <li>偏远地区物流费用 <el-input type="number" v-model="remoteLogisticsAmount" :disabled="$route.query.isDetail" placeholder="请填写物流费用"></el-input>
                    </li>
                </ul>
            </div>
            <div class="goodsBasic">
                商品出售模式设置
            </div>
            <div class="sellSet">
                <div class="pattern">
                    <p @click="checkPattern('DIRECT')" :class="isCheckPat =='DIRECT'?'addPatColor':''">直购模式</p>
                    <p @click="checkPattern('GROUP')" :class="isCheckPat =='GROUP'?'addPatColor':''">团拼模式</p>
                    <p @click="checkPattern('ONE_TWO_GROUP')" :class="isCheckPat =='ONE_TWO_GROUP'?'addPatColor':''">1+2模式</p>
                </div>
                <div class="directpurch">
                    <div class="head_quit" v-if="isCheckPat =='DIRECT'">
                        <div class="headbox">
                            <p class="suppot1"><span>*</span>会员价</p>
                            <el-input v-model="internalPrice" :disabled="$route.query.isDetail" type="number" class="headInput" />
                        </div>
                        <div class="headbox">
                            <p class="suppot1"><span>*</span>使用代金券后最低会员价</p>
                            <el-input v-model="internalMinPrice" :disabled="$route.query.isDetail" type="number" class="headInput" />
                        </div>

                    </div>
                    <div class="head_quit" v-else-if="isCheckPat =='GROUP'">
                        <div class="headbox">
                            <p class="suppot1"><span>*</span>会员价</p>
                            <el-input v-model="groupInternalPrice" :disabled="$route.query.isDetail" type="number" class="headInput" />
                        </div>
                        <div class="headbox">
                            <p class="suppot1"><span>*</span>拼单价</p>
                            <el-input v-model="groupPrice" :disabled="$route.query.isDetail" type="number" class="headInput" />
                        </div>
                    </div>
                    <div class="head_quit" v-else-if="isCheckPat == 'ONE_TWO_GROUP'">
                        <div class="headbox">
                            <p class="suppot1"><span>*</span>会员价</p>
                            <el-input v-model="oneTwoGroupInternalPrice" :disabled="$route.query.isDetail" type="number" class="headInput" />
                        </div>
                        <div class="headbox">
                            <p class="suppot1"><span>*</span>拼单价</p>
                            <el-input v-model="oneTwoGroupPrice" :disabled="$route.query.isDetail" type="number" class="headInput" />
                        </div>
                    </div>
                    <div class="head_quit">
                        <div class="headbox">
                            <p class="suppot">是否支持退货：</p>
                            <p>{{isCheckPat ==1?'支持':'不支持'}}</p>
                        </div>
                        <div class="headbox" v-if="isCheckPat =='DIRECT'">
                            <p class="suppot1">赠送合作商积分</p>
                            <el-radio-group v-model="partnerPoints" @change="changePoints" :disabled="$route.query.isDetail" class="isPoints">
                                <el-radio :label="2">不赠送</el-radio>
                                <div v-if="isGift" style="display:flex;align-items: center;">
                                    <el-radio :label="1">赠送</el-radio>
                                    <el-input type="number" v-model="partnerPointsNum" :disabled="$route.query.isDetail" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                                </div>
                                <div v-else style="display:flex;align-items: center;">
                                    <el-radio :label="1" disabled>赠送</el-radio>
                                    <el-input type="number" readonly v-model="partnerPointsNum" :disabled="$route.query.isDetail" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                                </div>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="diectGroup">
                        <el-checkbox-group v-model="diectGroupList" :disabled="$route.query.isDetail" @change="handleCheckedCitiesChange">
                            <el-checkbox label="DIRECT">直购</el-checkbox>
                            <el-checkbox label="GROUP">团购</el-checkbox>
                            <el-checkbox label="ONE_TWO_GROUP">1+2</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="goodsBasic">
                商品图片
            </div>
            <div class="public_center">
                <div class="bannerImg">
                    <p class="bannerP">
                        <span class="addRed">*</span>商品图片
                    </p>
                    <div class="uploadImg">
                        <p>商品头图</p>
                        <div class="moveImg">
                            <el-upload :disabled="$route.query.isDetail" action="/boss/file/uploadFile" file="商品头图" :file-list="goodImgHead" :limit="9" list-type="picture-card" :on-remove="handleRemove1" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess1">
                                <i class="el-icon-plus" />
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="bannerImg">
                    <p class="bannerP">
                        <span class="addRed">*</span>商品详情
                    </p>
                    <div class="uploadImg">
                        <p>商品详情</p>
                        <div class="moveImg">
                            <el-upload :disabled="$route.query.isDetail" action="/boss/file/uploadFile" file="商品详情" :file-list="goodImgDetaul" :limit="20" list-type="picture-card" :on-remove="handleRemove2" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess2">
                                <i class="el-icon-plus" />
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
            <div class="public_footer">
                <div class="footerImg">
                    <p class="footerP">
                        <span class="addRed">*</span>售后服务
                    </p>
                    <div class="footerBox">
                        <p class="upP">上传售后服务说明图片</p>
                        <div class="moveImg">
                            <el-upload :disabled="$route.query.isDetail" action="/boss/file/uploadFile" file="售后服务" :limit="9" list-type="picture-card" :on-remove="handleRemove3" :before-upload="beforeAvatarUpload" :file-list="goodImgSell" :on-success="handleAvatarSuccess3">
                                <i class="el-icon-plus" />
                            </el-upload>
                        </div>
                        <p class="serveTips">填写售后服务说明</p>
                        <el-input v-model="sellContent" :disabled="$route.query.isDetail" type="textarea" class="footerText" placeholder="请输入售后服务说明文字内容" maxlength="100" show-word-limit />
                    </div>
                </div>
                <div class="goodBtn">
                    <el-button v-if="$route.query.isDetail != true" type="primary" class="btnOne" :disabled="$route.query.isDetail" @click="unsureBtn">确认</el-button>
                    <el-button class="btnOne" @click="backShop">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { goodsAdd, goodsdetail, goodsEdit, partnerList, categoryAll } from '@/api/chain'
import addSpecs from "./components/specs.vue";

export default {
    name: '',
    components: {
        addSpecs
    },
    data() {
        return {
            uid: 10000,
            partnerName: '',
            goodsCategory: '',
            goodsTitle: '',
            secondTitle: '',
            marketPrice: '',
            internalPrice: 0,
            goodsStock: '',
            radio: 1,
            partnerPoints: 2,
            partnerPointsNum: null,
            sellContent: '',
            imageUrl: [],
            imageUrl1: [],
            imageUrl2: [],
            goodsDetailList: [],
            goodImgHead: [],
            goodImgDetaul: [],
            goodImgSell: [],
            partnerArr: [],
            cateOptions: [],
            loading: false,
            settlePrice: '',
            getDetailData: [],
            remoteLogisticsAmount: '',
            logisticsAmount: '',
            isCheckPat: 'DIRECT',
            groupPrice: '',
            diectGroupList: ["DIRECT"],
            specsArr: [
                {
                    specGroupName: "",
                    specItems: []
                }
            ],
            groupInternalPrice: '',
            recommendTag: 0,
            oneTwoGroupInternalPrice: '',
            oneTwoGroupPrice: '',
            internalMinPrice: '',
            isGift: true,
            remoteAreaList: []
        }
    },
    watch: {
        settlePrice(val) {
            if (Number(val) > 10000000) {
                this.$message({
                    message: '最大为10000000',
                    type: 'warning'
                })
                return
            }
            if (!this.$route.query.isDetail) {
                if (this.$route.query.goodsDetail) {
                    // this.internalPrice = Number(val) * 6
                    // this.groupInternalPrice = Number(val) * 6
                    // this.groupPrice = Number(val) * 5
                    // this.internalMinPrice = Number(val)+(Number(val) * 2)
                } else {
                    this.internalPrice = Number(val) * 6
                    this.groupInternalPrice = Number(val) * 6
                    this.groupPrice = Number(val) * 5
                    this.internalMinPrice = Number(val) + (Number(val) * 2)
                }
            }

        },
        internalMinPrice(val) {
            if (val) {
                this.isGift = false
            } else {
                this.isGift = true
            }
        },
    },
    created() {
        if (this.$route.query.goodsDetail) {
            this.goodsDetailList = JSON.parse(this.$route.query.goodsDetail)
            this.getChange()
        }
        this.categorylist()
    },
    methods: {
        handleCheckedCitiesChange(val) {
            console.log(val)
        },
        checkPattern(idx) {
            this.isCheckPat = idx
            if (!this.$route.query.isDetail) {
                this.diectGroupList = []
                this.diectGroupList.push(this.isCheckPat)
            }
        },
        changePoints(e) {
            if (e == 2) {
                this.partnerPointsNum = null
            }
        },
        categorylist() {
            categoryAll().then(res => {
                if (res.success) {
                    this.cateOptions = res.data
                }
            })
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                partnerList({ name: query }).then(res => {
                    if (res.success) {
                        this.loading = false;
                        this.partnerArr = res.data
                    }
                })
            } else {
                this.partnerArr = [];
            }
        },
        backShop() {
            this.$router.push({
                path: '/self-support/goodsManage',
            })
        },
        getChange() {
            goodsdetail({ goodsId: this.goodsDetailList.goodsId }).then(res => {
                if (res.success) {
                    this.getDetailData = res.data
                    this.partnerName = res.data.partnerName
                    this.goodsCategory = res.data.goodsCategoryName
                    this.goodsTitle = res.data.title
                    this.secondTitle = res.data.subtitle
                    this.partnerPointsNum = res.data.partnerPointsNum.num
                    this.marketPrice = res.data.marketPrice.num
                    this.settlePrice = res.data.settlePrice.num
                    this.internalPrice = res.data.internalPrice.num
                    this.goodsStock = res.data.stock
                    this.radio = res.data.sevenDayReturnGoods ? 1 : 2
                    this.partnerPoints = res.data.partnerPoints ? 1 : 2
                    this.specsArr = res.data.specs
                    this.remoteLogisticsAmount = res.data.remoteLogisticsAmount ? res.data.remoteLogisticsAmount.num : null
                    this.logisticsAmount = res.data.logisticsAmount ? res.data.logisticsAmount.num : null
                    this.groupInternalPrice = res.data.groupInternalPrice.num
                    this.groupPrice = res.data.groupPrice.num
                    this.diectGroupList = res.data.saleModes
                    this.recommendTag = res.data.recommendTag
                    this.oneTwoGroupInternalPrice = res.data.oneTwoGroupInternalPrice.num
                    this.oneTwoGroupPrice = res.data.oneTwoGroupPrice.num
                    this.internalMinPrice = res.data.internalMinPrice ? res.data.internalMinPrice.num : null
                    let arr = []
                    this.isCheckPat = this.diectGroupList[0]
                    this.remoteAreaList = res.data.remoteAreaList
                    this.goodImgHead = res.data.headImageUrls.map(item => {
                        arr.push(item)
                        return {
                            name: this.uid++,
                            url: item
                        }
                    })
                    this.imageUrl = arr
                    let arr1 = []
                    this.goodImgDetaul = res.data.detailImageUrls.map(item => {
                        arr1.push(item)
                        return {
                            id: this.uid++,
                            name: this.uid++,
                            uid: this.uid++,
                            url: item
                        }
                    })
                    this.imageUrl1 = arr1
                    let arr2 = []
                    this.goodImgSell = res.data.saleServiceImageUrls.map(item => {
                        arr2.push(item)
                        return {
                            id: this.uid++,
                            name: this.uid++,
                            uid: this.uid++,
                            url: item
                        }
                    })
                    this.imageUrl2 = arr2
                    this.sellContent = res.data.saleServiceMsg
                }
            })
        },
        handleAvatarSuccess1(res) {
            console.log(res)
            if (res.success) {
                this.imageUrl.push(res.data.webUrl)
            } else {
                this.$message({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        handleAvatarSuccess2(res) {
            if (res.success) {
                this.imageUrl1.push(res.data.webUrl)
            } else {
                this.$message({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        handleAvatarSuccess3(res) {
            if (res.success) {
                this.imageUrl2.push(res.data.webUrl)
            } else {
                this.$message({
                    message: res.message,
                    type: 'error'
                })
            }
        },
        handleRemove1(file, fileList) {
            console.log(fileList)
            let headImageUrlsArr = []
            fileList.forEach(e => {
                if (typeof (e) == 'string') {
                    headImageUrlsArr.push(e)
                } else {
                    if (e.hasOwnProperty('response')) {
                        headImageUrlsArr.push(e.response.data.webUrl)
                    } else {
                        headImageUrlsArr.push(e.url)
                    }
                }
            })
            this.imageUrl = headImageUrlsArr
        },
        handleRemove2(file, fileList) {
            let headImageUrlsArr = []
            fileList.forEach(e => {
                if (typeof (e) == 'string') {
                    headImageUrlsArr.push(e)
                } else {
                    if (e.hasOwnProperty('response')) {
                        headImageUrlsArr.push(e.response.data.webUrl)
                    } else {
                        headImageUrlsArr.push(e.url)
                    }
                }
            })
            this.imageUrl1 = headImageUrlsArr
        },
        handleRemove3(file, fileList) {
            let headImageUrlsArr = []
            fileList.forEach(e => {
                if (typeof (e) == 'string') {
                    headImageUrlsArr.push(e)
                } else {
                    if (e.hasOwnProperty('response')) {
                        headImageUrlsArr.push(e.response.data.webUrl)
                    } else {
                        headImageUrlsArr.push(e.url)
                    }
                }
            })
            this.imageUrl2 = headImageUrlsArr
        },
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

        unsureBtn() {
            console.log(this.remoteAreaList)
            if (this.partnerName == '') {
                this.$message({
                    message: '请输入合作商',
                    type: 'warning'
                })
                return
            } else if (this.goodsCategory == '') {
                this.$message({
                    message: '请选择商品分类',
                    type: 'warning'
                })
                return
            }
            else if (this.goodsTitle.length < 2) {
                this.$message({
                    message: '请输入正确商品标题',
                    type: 'warning'
                })
                return
            }
            else if (this.secondTitle.length < 2) {
                this.$message({
                    message: '请输入正确副标题',
                    type: 'warning'
                })
                return
            } else if (this.marketPrice == '' || this.marketPrice > 10000000) {
                this.$message({
                    message: '请输入正确市场价',
                    type: 'warning'
                })
                return
            } else if (this.settlePrice == '' || this.settlePrice > 10000000) {
                this.$message({
                    message: '请输入正确合作商结算价',
                    type: 'warning'
                })
                return
            } else if (this.goodsStock == '' || this.goodsStock > 10000000) {
                this.$message({
                    message: '请输入正确库存数',
                    type: 'warning'
                })
                return
            }
            else if (this.specsArr[0].specGroupName == '') {
                this.$message({
                    message: '请输入商品分类名称',
                    type: 'warning'
                })
                return
            }
            else if (this.diectGroupList == '') {
                this.$message({
                    message: '请选择直购或者拼团',
                    type: 'warning'
                })
                return
            }
            else if (this.imageUrl.length < 1) {
                this.$message({
                    message: '请上传商品图片',
                    type: 'warning'
                })
                return
            } else if (this.imageUrl1.length < 1) {
                this.$message({
                    message: '请上传商品详情',
                    type: 'warning'
                })
                return
            } else if (this.imageUrl2.length < 1 && this.sellContent == '') {
                this.$message({
                    message: '请上传售后服务说明图片或者说明',
                    type: 'warning'
                })
                return
            }

            if (this.isCheckPat == "DIRECT") {
                if (this.internalPrice == '') {
                    this.$message({
                        message: '请输入直购会员价',
                        type: 'warning'
                    })
                    return
                }
                // else if (this.internalMinPrice == '') {
                //     this.$message({
                //         message: '请输入代金券后最低会员价',
                //         type: 'warning'
                //     })
                //     return
                // }
            } else if (this.isCheckPat == "GROUP") {
                if (this.groupInternalPrice == '') {
                    this.$message({
                        message: '请输入团购会员价',
                        type: 'warning'
                    })
                    return
                } else if (this.groupPrice == '') {
                    this.$message({
                        message: '请输入拼单价',
                        type: 'warning'
                    })
                    return
                }
            } else if (this.isCheckPat == "ONE_TWO_GROUP") {
                if (this.oneTwoGroupInternalPrice == '') {
                    this.$message({
                        message: '请输入1+2模式会员价',
                        type: 'warning'
                    })
                    return
                } else if (this.oneTwoGroupPrice == '') {
                    this.$message({
                        message: '请输入拼单价',
                        type: 'warning'
                    })
                    return
                }
            }
            // 判断是否输入商品规格，没有输入就删除数组
            this.specsArr.forEach((item, index) => {
                if (item.specGroupName == '') {
                    delete this.specsArr[index]
                }
            })
            this.specsArr = this.specsArr.filter(val => {
                return val
            })
            for (let i = 0; i < this.specsArr.length; i++) {
                if (this.specsArr[i].specItems.length == 0) {
                    this.$message({
                        message: '请添加规格',
                        type: 'warning'
                    })
                    return
                }
                for (let j = 0; j < this.specsArr[i].specItems.length; j++) {
                    if (this.specsArr[i].specItems[j].specName.indexOf('规格') != -1) {
                        this.$message({
                            message: '请输入规格名称',
                            type: 'warning'
                        })
                        return
                    }
                }
            }
            for (var i = 0; i < this.diectGroupList.length; i++) {
                for (var j = this.diectGroupList.length - 1; j > i; j--) {
                    if (this.diectGroupList[i] == this.diectGroupList[j]) {
                        this.diectGroupList.splice(j, 1);
                    }
                }
            }
            let headImageUrlsArr = []
            if (this.imageUrl.length > 0) {
                this.imageUrl.forEach(e => {
                    if (typeof (e) == 'string') {
                        headImageUrlsArr.push(e)
                    } else {
                        if (e.hasOwnProperty('response')) {
                            headImageUrlsArr.push(e.response.data.webUrl)
                        } else {
                            headImageUrlsArr.push(e.url)
                        }
                    }
                })
            }
            let detailImageUrlsArr = []
            if (this.imageUrl1.length > 0) {
                this.imageUrl1.forEach(e => {
                    if (typeof (e) == 'string') {
                        detailImageUrlsArr.push(e)
                    } else {
                        if (e.hasOwnProperty('response')) {
                            detailImageUrlsArr.push(e.response.data.webUrl)
                        } else {
                            detailImageUrlsArr.push(e.url)
                        }
                    }
                })
            }
            let saleServiceImageUrlsArr = []
            if (this.imageUrl2.length > 0) {
                this.imageUrl2.forEach(e => {
                    if (typeof (e) == 'string') {
                        saleServiceImageUrlsArr.push(e)
                    } else {
                        if (e.hasOwnProperty('response')) {
                            saleServiceImageUrlsArr.push(e.response.data.webUrl)
                        } else {
                            saleServiceImageUrlsArr.push(e.url)
                        }
                    }
                })
            }
            const msg = {
                internalPrice: this.internalPrice ? this.internalPrice.toString() : null,
                groupInternalPrice: this.groupInternalPrice ? this.groupInternalPrice.toString() : null,
                partnerId: !isNaN(this.partnerName) ? this.partnerName : this.getDetailData.partnerId,
                goodsCategoryId: !isNaN(this.goodsCategory) ? this.goodsCategory : this.getDetailData.goodsCategoryId,
                detailImageUrls: detailImageUrlsArr,
                headImageUrls: headImageUrlsArr,
                marketPrice: this.marketPrice.toString(),
                settlePrice: this.settlePrice.toString(),
                sevenDayReturnGoods: this.radio == 1 ? true : false,
                stock: this.goodsStock,
                specs: this.specsArr,
                remoteLogisticsAmount: this.remoteLogisticsAmount ? this.remoteLogisticsAmount.toString() : null,
                logisticsAmount: this.logisticsAmount ? this.logisticsAmount.toString() : null,
                subtitle: this.secondTitle,
                partnerPoints: this.partnerPoints == 1 ? true : false,
                partnerPointsNum: this.partnerPointsNum ? this.partnerPointsNum.toString() : "0",
                title: this.goodsTitle,
                saleServiceImageUrls: saleServiceImageUrlsArr,
                saleServiceMsg: this.sellContent,
                saleModes: this.diectGroupList,
                groupPrice: this.groupPrice ? this.groupPrice.toString() : null,
                recommendTag: this.recommendTag,
                oneTwoGroupInternalPrice: this.oneTwoGroupInternalPrice ? this.oneTwoGroupInternalPrice.toString() : null,
                oneTwoGroupPrice: this.oneTwoGroupPrice ? this.oneTwoGroupPrice.toString() : null,
                internalMinPrice: this.internalMinPrice ? this.internalMinPrice.toString() : null,
                remoteAreaList:this.remoteAreaList?this.remoteAreaList:null
            }
            if (this.goodsDetailList.length < 1) {
                goodsAdd(msg).then(res => {
                    if (res.success) {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        })
                        this.$router.push({
                            path: '/self-support/goodsManage'
                        })
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
                })
            } else {
                msg.goodsId = this.goodsDetailList.goodsId
                goodsEdit(msg).then(res => {
                    if (res.success) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.$router.push({
                            path: '/self-support/goodsManage'
                        })
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        })
                    }
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
    padding: 20px;
    p {
        margin: 0;
    }
    ul {
        list-style: none;
    }
    .goodsTitle {
        margin: 0 0 20px;
    }
    .addRed {
        color: #ff0000;
    }
    .publicGoods {
        width: 100%;
        .goodsBasic {
            width: 100%;
            height: 35px;
            line-height: 35px;
            background: #dcdfe6;
            color: #666;
            text-align: center;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .public_head {
            ul {
                padding: 0;
                display: flex;
                flex-wrap: wrap;
                padding: 30px 50px 10px 84px;
                box-sizing: border-box;
                margin: 0;
                li {
                    display: flex;
                    width: 50%;
                    margin-bottom: 20px;
                    align-items: center;
                    p {
                        width: 120px;
                        span {
                            color: #ff0000;
                        }
                    }
                    .headInput {
                        width: 400px;
                    }
                }
            }
        }
        .logisticsSet {
            padding-left: 80px;
            display: flex;
            justify-content: space-between;
            .normalSent {
                display: flex;
                width: 50%;
                align-items: center;
                p {
                    width: 100px;
                }
                .el-input {
                    width: 300px;
                    margin-left: 30px;
                }
            }
            ul {
                width: 50%;
                padding: 0;
                li {
                    display: flex;
                    padding-bottom: 20px;
                    align-items: center;
                }
                .el-input {
                    width: 300px;
                    margin-left: 30px;
                }
            }
        }
        .sellSet {
            width: 100%;
            .pattern {
                width: 600px;
                margin: 0 auto 40px;
                display: flex;
                p {
                    width: 300px;
                    padding: 10px 0;
                    text-align: center;
                    cursor: pointer;
                    border: 1px solid #409eff;
                }
                .addPatColor {
                    background: #409eff;
                    color: #fff;
                }
            }
            .directpurch {
                .head_quit {
                    display: flex;
                    width: 80%;
                    margin: 0 auto;
                    .headbox {
                        width: 50%;
                        display: flex;
                        margin-bottom: 30px;
                        text-align: center;
                        align-items: center;
                        p {
                            // width: 120px;
                            span {
                                color: #ff0000;
                            }
                        }
                        .headInput {
                            width: 400px;
                        }
                        .suppot1 {
                            padding-right: 20px;
                        }
                        .isPoints {
                            display: flex;
                            align-items: center;
                        }
                    }
                }
                .hasReturn {
                    display: flex;
                    margin-left: 108px;
                    margin-bottom: 40px;
                }
                .diectGroup {
                    width: 100%;
                    padding: 30px 0;
                    text-align: center;
                    border-top: 1px solid #ddd;
                }
            }
        }
        .public_center {
            padding-bottom: 30px;
            border-bottom: 1px solid #ccc;
            .bannerImg {
                display: flex;
                padding: 30px 50px 10px 84px;
                box-sizing: border-box;
                .bannerP {
                    width: 100px;
                }
                .uploadImg {
                    p {
                        color: #ccc;
                        padding-bottom: 10px;
                    }
                }
            }
        }
        .public_footer {
            padding-bottom: 30px;
            .footerImg {
                display: flex;
                padding: 30px 50px 10px 84px;
                box-sizing: border-box;
                .footerP {
                    width: 100px;
                }
                .footerBox {
                    .upP {
                        color: #ccc;
                        padding-bottom: 10px;
                    }
                }
            }
            .serveTips {
                color: #ccc;
                padding: 10px 0 20px;
            }
            .footerText {
                ::v-deep .el-textarea__inner {
                    width: 600px;
                    height: 100px;
                }
            }
        }
        .goodBtn {
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
</style>
