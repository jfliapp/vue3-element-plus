<template>
    <div class="specs">
        <div class="specs_one">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addSpecsList" :disabled="isDisableSpecs">添加规格</el-button>
            <div class="classify" v-for="item,index in specsArr" :key="index">
                <el-input type="text" v-model="item.specGroupName" placeholder="请输入规则分类名称" :disabled="isDisableSpecs"></el-input>
                <ul>
                    <li v-for="item,itemIndex in item.specItems" :key="itemIndex" v-show="index != -1" @click="addName(index,itemIndex,item)">
                        <i class="el-icon-circle-close" @click.stop="delItem(index,itemIndex)"></i>
                        {{item.specName}}
                    </li>
                    <li v-if="isDisableSpecs" ><span class="el-icon-plus"></span> 添加规格</li>
                    <li @click="addItem(index)" v-else><span class="el-icon-plus"></span> 添加规格</li>
                </ul>
            </div>
        </div>
        <el-dialog title="商品规格设置" class="goodsAlert" :visible.sync="centerDialogVisible" width="30%" center>
            <div class="alertSet">
                <p>商品规格名称</p>
                <el-input type="text" placeholder="请输入商品规格名称" v-model="changeSpecsName" ></el-input>
            </div>
            <div class="uploadImg">
                <p>商品规格图片</p>
                <div class="moveImg">
                    <el-upload class="avatar-uploader" action="/boss/file/uploadFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alertEnsure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        specsArr: {
            type: Array
        },
        isDisableSpecs:{
            type: Boolean
        }
    },
    data() {
        return {
            // specsArr: [
            //     {
            //         specGroupName: "",
            //         specItems: []
            //     }
            // ],
            centerDialogVisible: false,
            changeSpecsName: '',
            imageUrl: '',
            changeParentIdx: '',
            changeIdx: '',
        };
    },
    created() { 
    },
    mounted() { },
    methods: {
        alertEnsure() {
            if (this.changeSpecsName == '') {
                this.$message({
                    message: '请输入商品规格名称',
                    type: 'warning'
                });
                return
            }else if (this.imageUrl == ''){
                this.$message({
                    message: '请上传图片',
                    type: 'warning'
                });
                return
            }
           
            this.specsArr[this.changeParentIdx].specItems[this.changeIdx].specName = this.changeSpecsName
            this.specsArr[this.changeParentIdx].specItems[this.changeIdx].imageUrl = this.imageUrl ? this.imageUrl : null
            this.centerDialogVisible = false
        },
        addName(parentIdx, idx, item) {
            if(!this.isDisableSpecs){
                console.log(item)
                this.centerDialogVisible = true
                this.changeParentIdx = parentIdx
                this.changeIdx = idx
                if(item.specName.indexOf('规格') == -1){
                    this.changeSpecsName = item.specName
                    this.imageUrl = item.imageUrl
                }
            }
        },
        addItem(idx) {
            let lengthNum = Number(this.specsArr[idx].specItems.length) + Number(1)
            this.changeSpecsName = ''
            this.imageUrl = ''
            let newItem = {
                imageUrl: "",
                specName: "规格"+ lengthNum 
            }
            if (this.specsArr[idx].specItems.length < 9) {
                this.specsArr[idx].specItems.push(newItem)
            }
        },
        addSpecsList() {
            let specsItems = {
                specGroupName: "",
                specItems: []
            }
            if (this.specsArr.length < 9) {
                this.specsArr.push(specsItems)
            }
        },
        delItem(parentIdx, idx) {
            if(!this.isDisableSpecs){   
                this.specsArr[parentIdx].specItems.splice(idx, 1)
            }
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = res.data.webUrl;
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
        }
    },
};
</script>
<style lang="scss" scoped>
.specs {
    margin: 0 auto;
    .specs_one {
        margin-bottom: 20px;
        padding-left: 80px;
        .classify {
            margin-top: 20px;
            border-bottom: 1px dotted #ccc;
            &:last-child {
                border-bottom: none;
            }
            .el-input {
                width: 300px;
            }
            ul {
                display: flex;
                list-style: none;
                padding: 0;
                li {
                    min-width: 100px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 80px;
                    font-size: 15px;
                    border: 1px solid #c0c4cc;
                    cursor: pointer;
                    margin-right: 10px;
                    position: relative;
                    i {
                        position: absolute;
                        top: -12px;
                        right: -6px;
                        font-size: 16px;
                        color: #c0c4cc;
                    }
                }
            }
        }
    }
    .goodsAlert {
        .alertSet {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            p {
                flex-shrink: 0;
                width: 150px;
                margin: 0;
            }
        }
        .uploadImg {
            display: flex;
            p {
                width: 150px;
                margin: 0;
            }
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409eff;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 150px;
                height: 150px;
                line-height: 150px;
                text-align: center;
                border: 1px solid #d9d9d9;
            }
            .avatar {
                width: 150px;
                height: 150px;
                display: block;
            }
        }
    }
}
</style>