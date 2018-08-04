<template>
    <el-autocomplete
        :value="showValue"
        :value-key="labelfield"
        :fetch-suggestions="queryModel"
        @select="handleSelect"
        @input="handleInput"
        v-bind="$attrs"
    ></el-autocomplete>
</template>

<script>
import _props_label_value_mixin from "./_props_label_value_mixin"
import _props_value_mixin from "./_props_value_mixin"
import _computed_value_label_map_mixin from './_computed_value_label_map_mixin'
import _validate_option_mono from "./_validate_option_mono"

export default{
    name:'field_model',
    inheritAttrs:true,
    mixins:[
        _props_label_value_mixin,
        _props_value_mixin,
        _computed_value_label_map_mixin,
        _validate_option_mono,
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
            this.setShowValueByValue();
        },
        setShowValueByValue(){
            let value = this.value;
            if(this.valueLabelMap.has(value)){
                this.showValue = this.valueLabelMap.get(value)
            }
        },
    },
    watch:{
        value:{
            handler:"setShowValueByValue",
            immediate:true,
        },
        candidate:{
            handler:"setShowValueByValue",
            immediate:true,
        },
    },
}
</script>