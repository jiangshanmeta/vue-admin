<template>
    <el-autocomplete
        :value="showValue"
        :props="{value:valuefield,label:labelfield}"
        :fetch-suggestions="queryModel"
        @input="handleInput"
        :placeholder="placeholder"
    ></el-autocomplete>
</template>

<script>
import _props_label_value_mixin from "./_props_label_value_mixin"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_value_mixin from "./_props_value_mixin"
export default{
    name:'field_model',
    mixins:[
        _props_label_value_mixin,
        _props_placeholder_mixin,
        _props_value_mixin,
    ],
    data(){
        return {
            showValue:'',
        }
    },
    computed:{
        valueLabelHash(){
            let valuefield = this.valuefield;
            let labelfield = this.labelfield;
            return this.candidate.reduce((obj,item)=>{
                obj[item[valuefield]] = item[labelfield];
                return obj;
            },{})
        },
    },
    props:{
        candidate:{
            type:Array,
            required:true,
        },
    },
    methods:{
        queryModel(queryString,cb){
            let data = queryString?this.candidate.filter((item)=>{
                return item[this.labelfield].includes(queryString);
            }):this.candidate;

            cb(data);
        },
        handleInput(value){
            if(this.valueLabelHash.hasOwnProperty(value)){
                this.$emit('input',value)
            }else{
                this.setShowValue(value);
            }
        },
        setShowValueByValue(){
            let value = this.value;
            if(this.valueLabelHash.hasOwnProperty(value)){
                this.setShowValue(this.valueLabelHash[value]);
            }
        },
        setShowValue(val){
            this.showValue = val;
        }
    },
    watch:{
        value:"setShowValueByValue",
        candidate:"setShowValueByValue"
    },
    created(){
        this.setShowValueByValue();
    }
}
</script>