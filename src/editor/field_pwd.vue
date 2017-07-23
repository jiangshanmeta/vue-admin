<template>
    <el-input v-model="" :placeholder="placeholder"></el-input>
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
            type:String,
            default:'',
        },
        placeholder:{
            default:'',
        }
    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
    }
}
</script>