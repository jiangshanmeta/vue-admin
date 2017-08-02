<template>
    <el-select v-model="currentValue" :placeholder="placeholder">
        <el-option v-for="item in candidate" :key="item.value" :value="item.value" :label="item.label">

        </el-option>
    </el-select>
</template>

<script>
import {formHelper} from "./mixins"
export default{
    mixins:[formHelper],
    data(){
        return {
            currentValue:this.value,
            candidate:[],
        }
    },
    props:{
        value:{
            // type:Number,

        },
        placeholder:{
            default:'',
        },
        uri:{
            type:String,
            required:true,
        },
    },
    methods:{
        getCandidate(){
            this.$axios.get(this.uri).then((json)=>{
                this.candidate = json.data;
            });
        },
    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
        this.getCandidate();
    },
}
</script>