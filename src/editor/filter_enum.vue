<template>
    <field_enum_select
        v-model="model"
        v-bind="$attrs"
    >
        <el-option 
            :value="allvalue"
            :label="alllabel"
        ></el-option>
    </field_enum_select>
</template>

<script>
import field_enum_select from "./field_enum_select"

import _filter_all_mixin from "./_filter_all_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"filter_enum",
    inheritAttrs:true,
    components:{
        field_enum_select
    },
    mixins:[
        _filter_all_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
}
</script>