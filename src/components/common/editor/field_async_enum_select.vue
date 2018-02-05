<template>
    <field_enum_select
        v-model="model"
        :candidate="candidate"
        v-bind="$attrs"
    >
        <template v-if="$slots.default">
            <slot></slot>
        </template>
    </field_enum_select>
</template>

<script>
import field_enum_select from "./field_enum_select.vue"

import _async_candidate_mixin from "./_async_candidate_mixin.js"
import _props_value_mixin from "./_props_value_mixin"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:'field_async_enum_select',
    inheritAttrs:true,
    mixins:[
        _async_candidate_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    components:{
        field_enum_select,
    },
}
</script>