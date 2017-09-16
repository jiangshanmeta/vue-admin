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
import field_relates_mixin from "./field_relates_mixin.js"
import field_enum_select from "./field_enum_select.vue"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"

export default{
    name:'field_relates_enum_select',
    mixins:[
        field_relates_mixin,
        _computed_model_mixin,
        _props_placeholder_mixin,
    ],
    components:{
        field_enum_select
    },
    props:{
        value:{
            required:true,
        },
    },
}
</script>