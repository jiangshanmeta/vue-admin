<template>
    <el-radio-group v-model="currentValue">
        <el-radio 
            v-for="item in candidate"
            :key="item.value"
            :label="item.value"
        >
            {{item.label}}
        </el-radio>
    </el-radio-group>
</template>

<script>
import {formHelper} from "./mixins"
export default{
    mixins:[formHelper],
    data(){
        return {
            currentValue:this.value,
        }
    },
    props:{
        value:{

        },
        candidate:{
            type:Array,
            required:true,
        },
    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
    }
}
</script>