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
import _editor_enum_mixin from "./_editor_enum_mixin"
import _computed_value_label_map_mixin from './_computed_value_label_map_mixin'

export default{
    name:'editor_enum_autocomplete',
    inheritAttrs:true,
    mixins:[
        _editor_enum_mixin,
        _computed_value_label_map_mixin,

    ],
    data(){
        return {
            showValue:'',
        }
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