<template>
    <field_enum_select
        v-model="model"
        :placeholder="placeholder"
        :candidate="candidate"
        :valuefield="valuefield"
        :labelfield="labelfield"
    >
        <el-option 
            :value="allvalue"
            :label="alllabel"
        ></el-option>
    </field_enum_select>
</template>

<script>
import field_enum_select from "./field_enum_select"

import field_enum_mixin from "./field_enum_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin"
import _filter_all_mixin from "./_filter_all_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
export default{
    components:{
        field_enum_select
    },
    mixins:[
        field_enum_mixin,
        _props_label_value_mixin,
        _computed_model_mixin,
        _filter_all_mixin,
        _props_placeholder_mixin,
    ],
}
</script>