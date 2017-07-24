<template>
    <el-date-picker
        v-model="currentValue"
        type="date"
        :placeholder="placeholder"
        @change="selectDate"
    >
    </el-date-picker>
</template>

<script>
import {formHelper} from "./mixins"
export default{
    data(){
        return {
            currentValue:this.value,
        }
    },
    props:{
        value:{
            type:String,
            default:'',
        },
        placeholder:{
            default:''
        }
    },
    mixins:[formHelper],
    created(){
        this._asyncProp('currentValue','value');
    },
    methods:{
        selectDate(newVal){
            this.$emit('input',newVal);
        },
    }
}
</script>