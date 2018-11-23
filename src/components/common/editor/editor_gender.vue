<template>
    <editor_enum_select 
        v-model="model"
        :candidate="candidate"
        v-bind="$attrs"
    ></editor_enum_select>
</template>

<script>
import editor_enum_select from './editor_enum_select.vue'

import _props_value_number_mixin from "./_props_value_number_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

const sexCandidate = [
    {value:0,label:'男'},
    {value:1,label:'女'},
];
export default{
    inheritAttrs:true,
    name:'editor_gender',
    mixins:[
        _computed_model_mixin,
        _props_value_number_mixin,
    ],
    components:{
        editor_enum_select
    },
    data(){
        return {
            candidate:sexCandidate,
        }
    },
}
</script>