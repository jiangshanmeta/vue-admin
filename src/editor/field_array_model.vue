<template>
<section>
    <ul class="list-group">
        <li class="list-group-item"
            v-for="(item,index) in value"
            :key="item"
        >
            {{labelValueHash.hasOwnProperty(item)?labelValueHash[item]:item}}
            <i class="el-icon-close pull-right" @click='removeItem(index)'></i>
        </li>
    </ul>
    <field_model
        v-model="selectedId"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :placeholder="placeholder"
        :candidate="candidate"
    ></field_model>
    <el-button type="success" @click="addItem">添加</el-button>
</section>
</template>

<script>
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import field_model from "./field_model.vue"

export default{
    name:'field_array_model',
    mixins:[
        _props_label_value_mixin,
        _computed_model_mixin,
        _props_placeholder_mixin,
    ],
    components:{
        field_model,
    },
    props:{
        candidate:{
            type:Array,
            required:true
        },
        value:{
            type:Array,
            required:true,
        }
    },
    data(){
        return {
            selectedId:'',
        }
    },
    computed:{
        labelValueHash(){
            let valuefield = this.valuefield;
            let labelfield = this.labelfield;
            return this.candidate.reduce((obj,item)=>{
                obj[item[valuefield]] = item[labelfield];
                return obj;
            },{})
        }
    },
    methods:{
        removeItem(index){
            let [...value] = this.value;
            value.splice(index,1);
            this.model = value;
        },
        addItem(){
            let [...value] = this.value;
            if(value.includes(this.selectedId)){
               return; 
            }
            value.push(this.selectedId);
            this.model = value;
        },
    }
}
</script>