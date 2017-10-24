<template>
    <el-upload
        :file-list="model"
        :action="uri"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :multiple="false"
    >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">由于底层框架问题一次只能上传一个文件</div>
    </el-upload>
</template>

<script>
import _props_value_array_mixin from "./_props_value_array_mixin.js"
export default{
    mixins:[
        _props_value_array_mixin,
    ],
    props:{
        uri:{
            type:String,
            required:true,
        },
    },
    computed:{
        model:{
            get(){
                return this._getValueCopy();
            },
            set(value){
                this.$emit('input',value);
            }
        }
    },
    methods:{
        _getValueCopy(){
            return this.value.map((item)=>{
                return Object.assign({},item)
            })
        },
        handleSuccess(response,file,fileList){
            let [...newArr] = this.value;
            newArr.push(response.data);
            this.model = newArr;
        },
        handlePreview(file){
            window.open(file.url)
        },
        handleRemove(file){
            let url = file.url;
            let index = this.value.findIndex((item)=>{
                return item.url === url
            });

            let [...newArr] = this.value;
            newArr.splice(index,1);
            this.model = newArr;
        }
    },
}
</script>