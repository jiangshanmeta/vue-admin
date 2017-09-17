<template>
    <field_enum_select
        v-model="model"
        :candidate="candidate"
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
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _async_candidate_mixin from "./_async_candidate_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_value_mixin from "./_props_value_mixin"
import field_enum_select from "./field_enum_select.vue"

export default{
    name:'field_async_enum_select',
    mixins:[
        _computed_model_mixin,
        _props_label_value_mixin,
        _async_candidate_mixin,
        _props_placeholder_mixin,
        _props_value_mixin,
    ],
    components:{
        field_enum_select,
    },
    props:{

    },
}
</script>