<template>
    <meta-upload
        :file-list="model"
        :multiple="false"
        :listType="listType"
        :onSuccess="handleSuccess"
        :onRemove="handleRemove"
        :disabled="disabled"
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
                :disabled="disabled"
                :listType="listType"
                :handlePreview="handlePreview"
            ></upload-list>
        </template>
    </meta-upload>
</template>

<script>
import metaUpload from "./meta-upload"
import uploadList from './meta-upload/upload-list';

import _props_value_array_mixin from "./_props_value_array_mixin"
import _props_disabled_mixin from "./_props_disabled_mixin"

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
        _props_disabled_mixin
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
                    let name = this.getName(item);
                    let url = this.getName(item);
                    let target = JSON.parse(JSON.stringify(item));
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
            let [...newArr] = this.value;
            newArr.push(this.getInfoFromResponse(response));
            this.model = newArr;

            this.onSuccess && this.onSuccess(response,file,fileList);
        },
        handleRemove(file){
            let valuefield = this.valuefield;
            let url = file.url;
            let index = this.value.findIndex((item)=>{
                return item[valuefield] === url
            });

            let [...newArr] = this.value;
            newArr.splice(index,1);
            this.model = newArr;
        }
    },
}
</script>