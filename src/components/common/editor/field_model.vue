<template>
    <el-autocomplete
        :value="showValue"
        :props="{value:valuefield,label:labelfield}"
        :fetch-suggestions="queryModel"
        @select="handleSelect"
        @input="handleInput"
        :placeholder="placeholder"
        :disabled="disabled"
    ></el-autocomplete>
</template>

<script>
import _props_disabled_mixin from "./_props_disabled_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_value_mixin from "./_props_value_mixin"
import _computed_value_label_map_mixin from './_computed_value_label_map_mixin'

export default{
    name:'field_model',
    mixins:[
        _props_disabled_mixin,
        _props_label_value_mixin,
        _props_placeholder_mixin,
        _props_value_mixin,
        _computed_value_label_map_mixin,
    ],
    data(){
        return {
            showValue:'',
        }
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
            cb(data)
        },
        handleInput(value){
            this.showValue = value
        },
        handleSelect(item){
            this.$emit('input',item[this.valuefield]);
            this.setShowValueByValue()
        },
        setShowValueByValue(){
            let value = this.value;
            if(this.valueLabelMap.has(value)){
                this.setShowValue(this.valueLabelMap.get(value));
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