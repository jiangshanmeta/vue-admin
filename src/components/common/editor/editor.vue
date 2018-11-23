<template>
    <meta-table
        v-if="!hasInjectComponent || componentsInjected"
        :field_list="field_list"
        :mode="mode"
        :fields="fields"
    >
        <template slot="label" slot-scope="scope">
            <labels
                :label="field_list[scope.field].label"
                :labelComponent="needInjectLabelComponents.map[scope.field]"
            >
                <component
                    v-if="needInjectLabelComponents.map[scope.field]"
                    :is="needInjectLabelComponents.map[scope.field].name"
                    :label="field_list[scope.field].label"
                    v-bind="needInjectLabelComponents.map[scope.field].config || {}"
                ></component>
            </labels>
        </template>
        <template slot-scope="scope">
            <component
                :ref="scope.field"
                :is="field_list[scope.field].editorComponent.name" 
                v-model="record[scope.field]" 
                v-bind="generateEditorProp(scope.field)"
            ></component>
            <tip
                v-if="field_list[scope.field].tip"
                :tip="field_list[scope.field].tip"
            ></tip>
            <p
                v-if="validators[scope.field] && validators[scope.field]['hasErr']"
                class="text-danger form-helper"
            >
                {{validators[scope.field]['errMsg']}}
            </p>
        </template>
    </meta-table>
</template>

<script>
import AsyncValidator from 'async-validator';
import labels from "@/components/common/labels/labels";
import tip from "@/components/common/editor/tip"

import injectComponents from "@/widget/injectComponents"
import filterLabelComponents from "@/injectHelper/labelComponentHelper"

export default{
    data(){
        return {
            labelComponentsInjected:false,
            editorComponentsInjected:false,
            validators:{},
            recordUnwatchs:[],
            hasValidateListener:false,
        }
    },
    components:{
        labels,
        tip,
        metaTable:()=>import("@/components/common/meta-table"),

        editor_string:()=>import("./editor_string"),
        editor_text:()=>import("./editor_text"),
        editor_pwd:()=>import("./editor_pwd"),
        editor_number:()=>import("./editor_number"),
        editor_int:()=>import("./editor_int"),
        editor_textrich:()=>import("./editor_textrich"),

        editor_enum_radio:()=>import("./editor_enum_radio"),
        editor_enum_radio_async:()=>import("./editor_enum_radio_async"),
        editor_enum_radio_relates:()=>import("./editor_enum_radio_relates"),
        editor_enum_select:()=>import("./editor_enum_select"),
        editor_enum_select_async:()=>import("./editor_enum_select_async"),
        editor_enum_select_relates:()=>import("./editor_enum_select_relates"),
        editor_enum_autocomplete:()=>import("./editor_enum_autocomplete"),
        editor_enum_autocomplete_async:()=>import("./editor_enum_autocomplete_async"),
        editor_enum_autocomplete_relates:()=>import("./editor_enum_autocomplete_relates"),
        editor_bool:()=>import("./editor_bool"),
        editor_gender:()=>import("./editor_gender"),

        editor_array_checkbox:()=>import("./editor_array_checkbox"),
        editor_array_checkbox_json:()=>import("./editor_array_checkbox_json"),
        editor_array_checkbox_async:()=>import("./editor_array_checkbox_async"),
        editor_array_checkbox_async_json:()=>import("./editor_array_checkbox_async_json"),
        editor_array_checkbox_relates:()=>import("./editor_array_checkbox_relates"),
        editor_array_checkbox_relates_json:()=>import("./editor_array_checkbox_relates_json"),
        editor_array_autocomplete:()=>import("./editor_array_autocomplete"),
        editor_array_autocomplete_json:()=>import("./editor_array_autocomplete_json"),
        editor_array_autocomplete_async:()=>import("./editor_array_autocomplete_async"),
        editor_array_autocomplete_async_json:()=>import("./editor_array_autocomplete_async_json"),
        editor_array_checkbox_relates:()=>import("./editor_array_checkbox_relates"),
        editor_array_checkbox_json:()=>import("./editor_array_checkbox_json"),
        
        editor_time_ts:()=>import("./editor_time_ts"),
        editor_time_year:()=>import("./editor_time_year"),
        editor_time_month:()=>import("./editor_time_month"),
        editor_time_day:()=>import("./editor_time_day"),
        
        
        field_file_mono:()=>import("./field_file_mono"),
        field_file_mono_json:()=>import("./field_file_mono_json"),
        field_file_multi:()=>import("./field_file_multi"),
        field_file_multi_json:()=>import("./field_file_multi_json"),
        field_image_mono:()=>import("./field_image_mono"),
        field_image_mono_json:()=>import("./field_image_mono_json"),
        field_image_multi:()=>import("./field_image_multi"),
        field_image_multi_json:()=>import("./field_image_multi_json"),
    },
    computed:{
        editFieldsArray(){
            return this.fields.reduce((arr,row)=>{
                return row.reduce((arr,field)=>{
                    arr.push(field);
                    return arr;
                },arr);
            },[])
        },
        formData(){
            return this.editFieldsArray.reduce((obj,field)=>{
                obj[field] = this.record[field];
                return obj;
            },{});
        },
        needInjectLabelComponents(){
            return filterLabelComponents(this.field_list,this.editFieldsArray,this.mode);
        },
        needInjectEditorComponents(){
            return this.editFieldsArray.filter((field)=>{
                return this.field_list[field].editorComponent && this.field_list[field].editorComponent.component;
            }).map((field)=>{
                return this.field_list[field].editorComponent;
            });
        },
        hasInjectComponent(){
            return this.needInjectLabelComponents.list.length || this.needInjectEditorComponents.length;
        },
        componentsInjected(){
            return this.labelComponentsInjected && this.editorComponentsInjected;
        },
    },
    methods:{
        getRelateData(relateItem){
            if(Array.isArray(relateItem.relateField)){
                return relateItem.relateField.reduce((obj,field)=>{
                    obj[field] = this.record[field];
                    return obj;
                },{});
            }else{
                return this.record[relateItem.relateField]
            }
        },
        generateEditorProp(field){
            const editorComponent = this.field_list[field].editorComponent;
            const defaultConfig = editorComponent.config || {};
            const modeConfig = editorComponent[`${this.mode}Config`] || {};
            const config = Object.assign({},defaultConfig,modeConfig);
            const {
                relates=[]
            } = config;
            const relateProps = relates.filter(item=>item.propField).reduce((obj,item)=>{
                obj[item.propField] = this.getRelateData(item);
                return obj;
            },Object.create(null));

            return Object.assign({},config,relateProps);
        },
        injectLabelComponents(){
            if(!this.needInjectLabelComponents.list.length){
                return this.labelComponentsInjected = true;
            }

            injectComponents(this,this.needInjectLabelComponents.list).then(()=>{
                this.labelComponentsInjected = true;
            });
        },
        injectEditorComponents(){
            if(!this.needInjectEditorComponents.length){
                return this.editorComponentsInjected = true;
            }

            injectComponents(this,this.needInjectEditorComponents).then(()=>{
                this.editorComponentsInjected = true;
            });
        },
        validate(){
            let keys = Object.keys(this.validators);

            let promises = keys.map((field)=>{
                return this.validateField(field,this.formData[field]);
            });

            if(!this.hasValidateListener){
                keys.forEach((field)=>{
                    this.validators[field].unwatch = this.addValidateInputListener(field);
                })
                this.hasValidateListener = true;
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
            return this.$watch(()=>{
                return this.record[field]
            },(value)=>{
                this.validateField.call(this,field,value).catch(()=>{})
            })
        },
        resetRelates(){
            this.recordUnwatchs.forEach((unwatch)=>{
                unwatch && unwatch();
            });
            this.recordUnwatchs = [];

            this.editFieldsArray.forEach((field)=>{
                const editorComponent = this.field_list[field].editorComponent;
                if(!editorComponent || !editorComponent.config || !editorComponent.config.relates){
                    return;
                }
                const relates = this.field_list[field].editorComponent.config.relates;

                relates.filter(relateItem=>typeof relateItem.handler === 'function').forEach((relateItem)=>{

                    let callback = function(newVal,oldVal){
                        if(this.$refs[field]){
                            relateItem.handler.call(this.$refs[field],newVal,this.field_list[field],oldVal);
                        }else{
                            setTimeout(()=>{
                                callback.call(this,newVal,oldVal)
                            },0)
                        }
                    }

                    const unwatch = this.$watch(()=>{
                        return this.getRelateData(relateItem);
                    },callback,relateItem.config);

                    this.recordUnwatchs.push(unwatch);

                });

            });

        },
        initValidate(){
            this.fields.forEach((row)=>{
                row.forEach((field)=>{
                    if(this.field_list[field].validator){
                        let asyncValidator = new AsyncValidator({[field]:this.field_list[field].validator});

                        this.$set(this.validators,field,{
                            hasErr:false,
                            errMsg:'',
                            validator:asyncValidator,
                            unwatch:null,
                        })

                        if(this.autoValidate){
                            this.validators[field].unwatch = this.addValidateInputListener(field);
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
        record:{
            immediate:true,
            handler(){
                Object.keys(this.validators).forEach((field)=>{
                    this.validators[field].unwatch && this.validators[field].unwatch();
                });

                this.validators = {};
                this.hasValidateListener = false;
                this.initValidate();
            }
        },
        fields:{
            immediate:true,
            handler(){
                this.labelComponentsInjected = false;
                this.editorComponentsInjected = false;
                this.injectLabelComponents();
                this.injectEditorComponents();
            },
        },
    },
    props:{
        fields:{
            type:Array,
            required:true
        },
        record:{
            type:Object,
            required:true,
        },
        field_list:{
            type:Object,
            required:true,
        },
        autoValidate:{
            type:Boolean,
            default:false,
        },
        mode:{
            type:String,
            default:"create"
        }
    },
    created(){
        this.$watch(()=>{
            return {
                record:this.record,
                fields:this.fields,
            };
        },this.resetRelates,{
            immediate:true,
        })
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