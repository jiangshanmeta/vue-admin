<template>
    <field_enum_select
        v-model="model"
        :candidate="finalOptions"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :placeholder="placeholder"
    >
        <template v-if="$slots.default">
            <slot></slot>
        </template>
    </field_enum_select>
</template>

<script>
import _field_relates_mixin from "./_field_relates_mixin.js"
import field_enum_select from "./field_enum_select.vue"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_value_mixin from "./_props_value_mixin"
export default{
    name:'field_relates_enum_select',
    mixins:[
        _field_relates_mixin,
        _computed_model_mixin,
        _props_placeholder_mixin,
        _props_value_mixin
    ],
    components:{
        field_enum_select
    },
    props:{

    },
}
</script>