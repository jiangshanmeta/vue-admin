<template>
    <meta-upload
        :file-list="model"
        :multiple="false"
        :listType="listType"
        :onSuccess="handleSuccess"
        :onRemove="handleRemove"
        v-bind="$attrs"
    >
        <template slot="default">
            <slot name="default"></slot>
        </template>
        <template slot="tip">
            <slot name="tip"></slot>
        </template>

        <template slot="uploadList" slot-scope="props">
            <upload-list
                :files="props.files"
                :remove="props.remove"
                :listType="listType"
                :handlePreview="handlePreview"
                v-bind="$attrs"
            ></upload-list>
        </template>
    </meta-upload>
</template>

<script>
import metaUpload from "./meta-upload"
import uploadList from './meta-upload/upload-list';

import _props_value_array_mixin from "./_props_value_array_mixin"


function noop(){}
function identity(value){
    return value;
}

// 这个组件要处理和上传组件数据格式的映射


export default{
    inheritAttrs:true,
    components:{
        metaUpload,
        uploadList,
    },
    mixins:[
        _props_value_array_mixin,
    ],
    props:{
        listType:{
            type:String,
            default:'text'   // text,picture,picture-card
        },
        onSuccess:{
            type:Function,
            default:noop,
        },
        onRemove:{
            type:Function,
            default:noop,
        },
        getInfoFromResponse:{
            type:Function,
            default:identity,
        },
        handlePreview:{
            type:Function,
            default:noop,
        },
        getName:{
            type:Function,
            default:identity,
        },
        getUrl:{
            type:Function,
            default:identity,
        },
    },
    computed:{
        model:{
            get(){
                return this.value.map((item)=>{
                    const name = this.getName(item);
                    const url = this.getUrl(item);
                    const target = JSON.parse(JSON.stringify(item));
                    target['name'] = name;
                    target['url'] = url;
                    return target
                });

            },
            set(value){
                this.$emit('input',value);
            }
        }
    },
    methods:{
        handleSuccess(response,file,fileList){
            const [...newArr] = this.value;
            newArr.push(this.getInfoFromResponse(response));
            this.model = newArr;

            this.onSuccess && this.onSuccess(response,file,fileList);
        },
        handleRemove(file){
            const url = file.url;
            const index = this.value.findIndex((item)=>{
                return this.getUrl(item) === url
            });

            const [...newArr] = this.value;
            newArr.splice(index,1);
            this.model = newArr;
        }
    },
}
</script>