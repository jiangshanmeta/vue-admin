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
import _model_mixin from "./_model_mixin.js"
import label_value_mixin from "./label_value_mixin.js"
import async_candidate_mixin from "./async_candidate_mixin.js"

import field_enum_select from "./field_enum_select.vue"

export default{
    name:'field_async_enum_select',
    mixins:[_model_mixin,label_value_mixin,async_candidate_mixin],
    components:{
        field_enum_select,
    },
    props:{
        value:{
            required:true,
        },
        placeholder:{

        },
    },
}
</script>