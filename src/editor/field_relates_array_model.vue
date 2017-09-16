<template>
    <field_array_model
        v-model="model"
        :labelfield="labelfield"
        :valuefield="valuefield"
        :placeholder="placeholder"
        :candidate="finalOptions"
    ></field_array_model>
</template>

<script>
import field_array_model from "./field_array_model.vue"
import _computed_model_mixin from "./_computed_model_mixin.js"
import field_relates_mixin from "./field_relates_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"

export default{
    name:'field_relates_array_model',
    mixins:[
        field_relates_mixin,
        _computed_model_mixin,
        _props_placeholder_mixin,
    ],
    components:{
        field_array_model,
    },
    props:{
        value:{
            type:Array,
            required:true,
        },
    }
}
</script>