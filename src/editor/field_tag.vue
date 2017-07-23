<template>
    <el-checkbox-group v-model="currentValue">
        <el-checkbox v-for="item in candidate" :key="item.value" :label="item.value">
            {{item.label}}
        </el-checkbox>
    </el-checkbox-group>
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
            type:Array,
            required:true,
        },
        candidate:{
            type:Array,
            required:true,
        },
    },
    watch:{
        // value(newVal){
        //     this.selected = newVal;

        // },
        // selected(newVal){
        //     this.$emit('input',newVal);
        // }
    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
    }
}
</script>