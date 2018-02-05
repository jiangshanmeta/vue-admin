<template>
    <field_enum_select 
        v-model="model" 
        :candidate="candidate"
        v-bind="$attrs"
    >
        <template v-if="$slots.default">
            <slot></slot>
        </template>
    </field_enum_select>
</template>

<script>
import field_enum_select from './field_enum_select.vue'

import _props_value_number_mixin from "./_props_value_number_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

let boolCandidate = [
    {value:0,label:'否'},
    {value:1,label:'是'},
];

export default{
    name:'field_bool',
    mixins:[
        _computed_model_mixin,
        _props_value_number_mixin,
    ],
    data(){
        return {
            candidate:boolCandidate,
        }
    },
    components:{
        field_enum_select
    },
}
</script>