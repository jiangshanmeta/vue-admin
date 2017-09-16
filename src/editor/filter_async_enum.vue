<template>
    <field_async_enum_select
        v-model="model"
        :placeholder="placeholder"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :uri="uri"
    >
        <el-option
            :value="allvalue"
            :label="alllabel"
        ></el-option>
    </field_async_enum_select>
</template>

<script>
import field_async_enum_select from "./field_async_enum_select"

import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _filter_all_mixin from "./_filter_all_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
export default{
    components:{
        field_async_enum_select
    },
    mixins:[
        _props_label_value_mixin,
        _computed_model_mixin,
        _filter_all_mixin,
        _props_placeholder_mixin,
    ],
    props:{
        value:{
            required:true,
        },
        uri:{
            type:String,
            required:true,
        },

    },
}
</script>