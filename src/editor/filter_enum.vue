<template>
    <el-select 
        v-model="currentValue" 
        :placeholder="placeholder"
        @change="changeHandler"
    >
        <el-option value="all" label="所有"></el-option>
        <el-option v-for="item in candidate" :key="item.value" :value="item.value" :label="item.label">
        </el-option>
    </el-select>
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
            type:[Number,String],
            default:'all',
        },
        candidate:{
            type:Array,
            required:true,
        },
        placeholder:{
            default:'',
        }
    },
    methods:{
        changeHandler(newVal){
            this.$emit('change',newVal)
        }
    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
    }

}
</script>