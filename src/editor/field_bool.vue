<template>
    <field_enum_select 
        v-model="model" 
        :candidate="candidate"
        :placeholder="placeholder"
    ></field_enum_select>

</template>

<script>
import model_mixin from "./model_mixin.js"
import field_enum_select from './field_enum_select.vue'

let boolCandidate = [
    {value:0,label:'否'},
    {value:1,label:'是'},
];

export default{
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