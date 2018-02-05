<template>
    <field_relates_enum_select
        v-model="model"
        v-bind="$attrs"
    >
        <el-option
            :value="allvalue"
            :label="alllabel"
        ></el-option>
    </field_relates_enum_select>
</template>

<script>
import field_relates_enum_select from "./field_relates_enum_select.vue"

import _filter_all_mixin from "./_filter_all_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    name:"filter_relates_enum",
    inheritAttrs:true,
    components:{
        field_relates_enum_select,
    },
    mixins:[
        _filter_all_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
}
</script>