<template>
<section>
    <ul class="list-group">
        <li class="list-group-item clearfix" v-for="(item,index) in currentValue">
           {{idNameHash[item]}}<i class="el-icon-close pull-right" @click='removeItem(index)'></i>
        </li>
    </ul>
    <el-select v-model="selectValue"    :placeholder="placeholder" filterable>
        <el-option v-for="item in candidate" :key="item.value" :value="item.value" :label="item.label">

        </el-option>
    </el-select>
    <el-button type="success" @click="addItem">增加</el-button>
</section>
</template>

<script>
import {formHelper} from "./mixins"

export default {
    data (){
        return {
            currentValue:this.value,
            selectValue:'',
        }
    },
    computed:{
        idNameHash(){
            return this.candidate.reduce(function(obj,item){
                obj[item.value] = item.label;
                return obj;
            },{});
        }
    },
    methods:{
        removeItem(index){
            if(!confirm('确认删除')){
                return;
            }
            this.currentValue.splice(index,1);
        },
        addItem(){
            if(!this.selectValue){
                alert('请选择');
                return;
            }
            this.currentValue.push(this.selectValue);
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
        placeholder:{
            default:'',
        },

    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
    },
}


</script>