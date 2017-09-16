<template>
    <field_enum_select 
        v-model="model" 
        :candidate="candidate"
        :placeholder="placeholder"
    >
        <template v-if="$slots.default">
            <slot></slot>
        </template>
    </field_enum_select>
</template>

<script>
import _computed_model_mixin from "./_computed_model_mixin.js"
import field_enum_select from './field_enum_select.vue'
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_value_number_mixin from "./_props_value_number_mixin.js"
const sexCandidate = [
    {value:0,label:'男'},
    {value:1,label:'女'},
];
export default{
    name:'field_sex',
    mixins:[
        _computed_model_mixin,
        _props_placeholder_mixin,
        _props_value_number_mixin,
    ],
    components:{
        field_enum_select
    },
    data(){
        return {
            candidate:sexCandidate,
        }
    },
    props:{

    }
}
</script>