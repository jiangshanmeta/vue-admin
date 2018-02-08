<template>
<section>
    <ul class="list-group">
        <li class="list-group-item"
            v-for="(item,index) in value"
            :key="index"
        >
            {{valueLabelMap.has(item)?valueLabelMap.get(item):item}}
            <i class="el-icon-close pull-right" @click='removeItem(index)'></i>
        </li>
    </ul>
    <field_model
        v-model="selectedId"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :candidate="candidate"
        v-bind="$attrs"
    ></field_model>
    <el-button type="success" @click="addItem">添加</el-button>
</section>
</template>

<script>
import field_model from "./field_model.vue"

import _tag_validate_mixin from "./_tag_validate_mixin"
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _props_candidate_mixin from "./_props_candidate_mixin"
import _computed_value_label_map_mixin from './_computed_value_label_map_mixin'

export default{
    name:'field_array_model',
    inheritAttrs:true,
    mixins:[
        _tag_validate_mixin,
        _props_value_array_mixin,
        _props_label_value_mixin,
        _props_candidate_mixin,
        _computed_value_label_map_mixin,
    ],
    components:{
        field_model,
    },
    data(){
        return {
            selectedId:'',
        }
    },
    methods:{
        removeItem(index){
            this.value.splice(index,1)
        },
        addItem(){
            if(!this.value.includes(this.selectedId)){
                this.value.push(this.selectedId);
            }
        },
    },
}
</script>