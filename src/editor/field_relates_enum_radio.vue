<template>
    <field_enum_radio
        v-model="model"
        :candidate="finalOptions"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_enum_radio>
</template>

<script>
import field_relates_mixin from "./field_relates_mixin.js"
import field_enum_radio from "./field_enum_radio.vue"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_value_mixin from "./_props_value_mixin"

export default{
    name:'field_relates_enum_radio',
    mixins:[
        field_relates_mixin,
        _computed_model_mixin,
        _props_value_mixin,
    ],
    components:{
        field_enum_radio
    },
    props:{

    },
}
</script>