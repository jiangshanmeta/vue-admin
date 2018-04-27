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
        :value="selectedId"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :candidate="candidate"
        @input="addItem"
        v-bind="$attrs"
    ></field_model>
</section>
</template>

<script>
import field_model from "./field_model.vue"

// import _tag_validate_mixin from "./_tag_validate_mixin"
import _validate_option_multi from "./_validate_option_multi"
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _props_candidate_mixin from "./_props_candidate_mixin"
import _computed_value_label_map_mixin from './_computed_value_label_map_mixin'

export default{
    name:'field_array_model',
    inheritAttrs:true,
    mixins:[
        _validate_option_multi,
        // _tag_validate_mixin,
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
        addItem(selectedId){
            this.selectedId = selectedId;
            if(!this.value.includes(selectedId)){
                this.value.push(selectedId);
            }
        },
    },
}
</script>

<style scoped>
.list-group-item{
    font-size:14px;
    padding:6px 12px;
}
.list-group-item .el-icon-close{
    font-size:12px;
    position:relative;
    top:5px;
}
</style>