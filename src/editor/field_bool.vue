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
import model_mixin from "./model_mixin.js"
import field_enum_select from './field_enum_select.vue'

let boolCandidate = [
    {value:0,label:'否'},
    {value:1,label:'是'},
];

export default{
    name:'field_bool',
    mixins:[model_mixin],
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
        placeholder:{
            
        }
    }
}
</script>