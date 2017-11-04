<template>
    <field_model
        v-model="model"
        :candidate="filter_candidate"
        :labelfield="labelfield"
        :valuefield="valuefield"
        v-bind="$attrs"
    ></field_model>
</template>

<script>
import field_model from "./field_model.vue"

import _filter_all_mixin from "./_filter_all_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _filter_model_mixin from "./_filter_model_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"


export default{
    name:"filter_model",
    inheritAttrs:true,
    components:{
        field_model,
    },
    mixins:[
        _filter_all_mixin,
        _props_value_mixin,
        _props_label_value_mixin,
        _filter_model_mixin,
        _computed_model_mixin,
    ],
    props:{
        candidate:{
            type:Array,
            required:true,
        },
    },
}
</script>