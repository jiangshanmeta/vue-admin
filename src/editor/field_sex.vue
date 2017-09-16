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
import _model_mixin from "./_model_mixin.js"
import field_enum_select from './field_enum_select.vue'

const sexCandidate = [
    {value:0,label:'男'},
    {value:1,label:'女'},
];
export default{
    name:'field_sex',
    mixins:[_model_mixin],
    components:{
        field_enum_select
    },
    data(){
        return {
            candidate:sexCandidate,
        }
    },
    props:{
        value:{
            type:Number,
            required:true,
        },
        placeholder:{

        },
    }
}
</script>