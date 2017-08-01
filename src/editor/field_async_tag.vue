<template>
    <el-checkbox-group v-model="currentValue">
        <el-checkbox v-for="item in candidate" :key="item.value" :label="item.value">
            {{item.label}}
        </el-checkbox>
        <el-button 
            @click="selectAll"
            size="small"
            type="primary"
        >
            全选
        </el-button>
    </el-checkbox-group>
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
            type:Array,
            default:function(){
                return [];
            },
        },
        uri:{
            type:String,
            required:true,
        }
    },
    methods:{
        getCandidate(){
            this.$axios.get(this.uri).then((json)=>{
                this.candidate = json.data;
            })
        },
        selectAll(){
            this.currentValue = this.values;
        },
    },
    computed:{
        values(){
            return this.candidate.reduce(function(arr,item){
                arr.push(item.value)
                return arr;
            },[])
        },

    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
        this.getCandidate();
    },
}
</script>