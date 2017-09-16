<template>
    <field_tag
        v-model="model"
        :candidate="finalOptions"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_tag>
</template>

<script>
import field_relates_mixin from "./field_relates_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import field_tag from "./field_tag.vue"
export default{
    name:'field_relates_tag',
    mixins:[
        field_relates_mixin,
        _computed_model_mixin,
        _props_value_array_mixin,
    ],
    components:{
        field_tag,
    },
    props:{

    },
}
</script>