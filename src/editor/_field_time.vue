<template>
    <el-date-picker
        :type="type"
        :placeholder="placeholder"
        v-model="currentValue"
        @change="handleChange"
    ></el-date-picker>
</template>

<script>
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
export default{
    data(){
        return {
            currentValue:'',
        }
    },
    mixins:[
        _props_placeholder_mixin,
    ],
    props:{
        type:{
            type:String,
            required:true,
        },
    },
    methods:{
        handleChange(newVal=''){
            this.$emit('input',newVal)
        },
    },
    watch:{
        value:{
            immediate:true,
            handler(newVal){
                this.currentValue = newVal
            }
        }
    },
}
</script>