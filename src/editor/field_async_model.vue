<template>
    <field_model
        v-model="model"
        :candidate="candidate"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :placeholder="placeholder"
    ></field_model>
</template>

<script>
import field_model from "./field_model.vue"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_value_mixin from "./_props_value_mixin"
import _async_candidate_mixin from "./_async_candidate_mixin"

export default{
    name:'field_async_model',
    mixins:[
        _props_label_value_mixin,
        _computed_model_mixin,
        _async_candidate_mixin,
        _props_placeholder_mixin,
        _props_value_mixin,
    ],
    components:{
        field_model
    },
    props:{

    }
}
</script>