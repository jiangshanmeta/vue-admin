<template>
    <el-date-picker
        type="datetime"
        :placeholder="placeholder"
        :format="format"
        v-model="currentValue"
        @change="selectDate"
    ></el-date-picker>
</template>

<script>
import {formHelper} from "./mixins"
export default{
    data (){
        return {
            currentValue:this.value,
        }
    },
    mixins:[formHelper],
    props:{
        value:{
            type:String,

        },
        placeholder:{
            default:'选择日期时间',
        },
        format:{
            default:'yyyy-MM-dd HH:mm:ss',
        },

    },
    methods:{
        selectDate(newVal){
            this.$emit('input',newVal);
        },
    },
    watch:{

    },
    created(){
        this._asyncProp('currentValue','value');
    }
}
</script>