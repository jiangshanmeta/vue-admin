<template>
    <el-input 
        type="textarea" 
        v-model="currentValue"
        :placeholder="placeholder"
    ></el-input>
</template>

<script>
import {formHelper} from "./mixins"
export default{
    data(){
        return {
            currentValue:this.value,
        }
    },
    mixins:[formHelper],
    props:{
        value:{
            default:'',
        },
        placeholder:{
            default:''
        },
    },
    watch:{

    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
    },
}
</script>