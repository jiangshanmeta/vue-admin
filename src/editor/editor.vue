<template>
    <table 
        class="table"
        v-if="!hasAsyncComponent || isComponentsLoaded"
    >
        <tr v-for="row in fields">
            <template v-for="item in row">
                <td>{{item.label}}</td>
                <td :colspan="row.length===1?3:1">
                    <component
                        :is="item.editorComponent.name" 
                        v-model="item.value" 
                        v-bind="mergeAttrsConfig(item.editorComponent.config,item.editorComponent[mode + 'Config'])"
                    ></component>
                    <p 
                        v-if="item.tip" 
                        class="form-helper"
                    >
                        {{item.tip}}
                    </p>
                    <p 
                        v-if="validators[item.field] && validators[item.field]['hasErr']"
                        class="text-danger form-helper"
                    >
                        {{validators[item.field]['errMsg']}}
                    </p>
                </td>
            </template>
        </tr>
    </table>
</template>

<script>
import field_array_model from "./field_array_model"
import field_async_array_model from "./field_async_array_model"
import field_async_enum_radio from "./field_async_enum_radio"
import field_async_enum_select from "./field_async_enum_select"
import field_async_model from "./field_async_model"
import field_async_tag from "./field_async_tag"
import field_bool from "./field_bool"
import field_day from "./field_day"
import field_enum_radio from "./field_enum_radio"
import field_enum_select from "./field_enum_select"
import field_file from "./field_file"
import field_image from "./field_image"
import field_images from "./field_images"
import field_int from "./field_int"
import field_model from "./field_model"
import field_month from "./field_month"
import field_number from "./field_number"
import field_pwd from "./field_pwd"
import field_relates_array_model from "./field_relates_array_model"
import field_relates_enum_radio from "./field_relates_enum_radio"
import field_relates_enum_select from "./field_relates_enum_select"
import field_relates_model from "./field_relates_model"
import field_relates_tag from "./field_relates_tag"
import field_sex from "./field_sex"
import field_string from "./field_string"
import field_tag from "./field_tag"
import field_text from "./field_text"
import field_text_rich from "./field_text_rich"
import field_ts from "./field_ts"
import field_year from "./field_year"



import {observe_relates} from "./field_relates_helper.js"
import dynamicImportComponent from "@/mixins/common/dynamicImportComponent.js"
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"

import AsyncValidator from 'async-validator';

export default{
    mixins:[
        dynamicImportComponent,
        mergeAttrsConfig,
    ],
    data(){
        return {
            proxyFields:{},
            validators:{},
            isComponentsLoaded:false,
            hasValidateListener:false,
        }
    },
    components:{
        field_array_model,
        field_async_array_model,
        field_async_enum_radio,
        field_async_enum_select,
        field_async_model,
        field_async_tag,
        field_bool,
        field_day,
        field_enum_radio,
        field_enum_select,
        field_file,
        field_image,
        field_images,
        field_int,
        field_model,
        field_month,
        field_number,
        field_pwd,
        field_relates_array_model,
        field_relates_enum_radio,
        field_relates_enum_select,
        field_relates_model,
        field_relates_tag,
        field_sex,
        field_string,
        field_tag,
        field_text,
        field_text_rich,
        field_ts,
        field_year

    },
    computed:{
        formData(){
            return this.fields.reduce((obj,item)=>{
                item.reduce((obj,item)=>{
                    obj[item.field] = item.value;
                    return obj;
                },obj)
                return obj;
            },{});
        },
        hasAsyncComponent(){
            for(let row of this.fields){
                for(let item of row){
                    if(item.editorComponent && item.editorComponent.path){
                        return true;
                    }
                }
            }
            return false;
        }
    },
    methods:{
        importEditor(){
            if(this.hasAsyncComponent){
                let components = this.fields.reduce((arr,row)=>{
                    for(let item of row){
                        if(item.editorComponent && item.editorComponent.path){
                            arr.push(item.editorComponent.path)
                        }
                    }
                    return arr;
                },[]);

                this.dynamicImportComponent(components).then(()=>{
                    this.isComponentsLoaded = true;
                })
            }
        },
        validate(){
            let keys = Object.keys(this.validators);

            let promises = keys.map((field)=>{
                return this.validateField(field,this.formData[field]);
            });

            if(!this.hasValidateListener){
                keys.forEach((field)=>{
                    this.addValidateInputListener(field);
                })
            }

            return Promise.all(promises).then(()=>{
                return JSON.parse(JSON.stringify(this.formData));
            }).catch((err)=>{
                return Promise.reject(err);
            })
        },
        validateField(field,value){
            return new Promise((resolve,reject)=>{
                let asyncValidator = this.validators[field]['validator'];
                asyncValidator.validate({[field]:value},(errors,fields)=>{
                    if(errors){
                        this.validators[field]['hasErr'] = true;
                        this.validators[field]['errMsg'] = errors[0]['message'];
                        reject(errors[0]['message']);
                    }else{
                        this.validators[field]['hasErr'] = false;
                        this.validators[field]['errMsg'] = '';
                        resolve();
                    }
                })
            })

        },
        addValidateInputListener(field){
            this.$watch(()=>{
                return this.proxyFields[field]
            },(value)=>{
                this.validateField.call(this,field,value).catch(()=>{})
            })
        },
        initRelates(newFields){
                newFields.forEach((row)=>{
                    row.forEach((item)=>{
                        Object.defineProperty(this.proxyFields,item.field,{
                            get(){
                                return item.value
                            },
                            set(){

                            },
                            enumerable:true,
                            configurable:true,
                        })

                        if(item.editorComponent && item.editorComponent.config && item.editorComponent.config.relates){
                            observe_relates(item.editorComponent.config.relates,this.proxyFields)
                        }


                    })
                });
        },
        initValidate(newFields){
            newFields.forEach((row)=>{
                row.forEach((item)=>{
                    if(item.validator){
                        let asyncValidator = new AsyncValidator({[item.field]:item.validator});

                        this.$set(this.validators,item.field,{
                            hasErr:false,
                            errMsg:'',
                            validator:asyncValidator,
                        })

                        if(this.autoValidate){
                            this.addValidateInputListener(item.field);
                        }

                    }

                })
            });
            if(this.autoValidate){
                this.hasValidateListener = true;
            }
        }
    },
    watch:{
        fields:{
            immediate:true,
            handler(newFields){
                this.proxyFields = {};
                this.validators = {};
                this.isComponentsLoaded = false;
                this.hasValidateListener = false;
                this.importEditor();
                this.initRelates(newFields);
                this.initValidate(newFields);
            }
        },
    },
    props:{
        fields:{
            type:Array,
            required:true
        },
        autoValidate:{
            default:true
        },
        mode:{
            type:String,
            default:"create"
        }
    },
}
</script>

<style scoped>
.form-helper{
    margin-top:5px;
    margin-bottom:5px;
    color:#737373;
    font-size:12px;
    line-height:1.42;
}
.text-danger{
    color:#FF4949;
}
</style>