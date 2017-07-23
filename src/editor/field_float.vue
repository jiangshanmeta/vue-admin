<template>
    <el-input
        :value="currentValue"
        @change="handleInput" 
        ref="input"
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
            type:Number,
            default:0
        },
        placeholder:{
            default:'',
        }
    },
    watch:{

    },
    methods:{
        handleInput(newVal){
            newVal = this._preDealInput(newVal);

            if(!isNaN(newVal)){
                this.currentValue = newVal;
            }else{
                this.$refs.input.setCurrentValue(this.currentValue);
            }
        },
        _preDealInput(val){
            return parseFloat(Number(val))
        }
    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
    }
}
</script>