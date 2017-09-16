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
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import field_enum_select from './field_enum_select.vue'

let boolCandidate = [
    {value:0,label:'否'},
    {value:1,label:'是'},
];

export default{
    name:'field_bool',
    mixins:[
        _computed_model_mixin,
        _props_placeholder_mixin,
    ],
    data(){
        return {
            candidate:boolCandidate,
        }
    },
    components:{
        field_enum_select
    },
    props:{
        value:{
            type:Number,
            required:true,
        },
    }
}
</script>