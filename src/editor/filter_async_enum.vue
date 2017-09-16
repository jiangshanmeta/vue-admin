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

import label_value_mixin from "./label_value_mixin.js"
import _model_mixin from "./_model_mixin.js"
import _filter_all_mixin from "./_filter_all_mixin.js"

export default{
    components:{
        field_async_enum_select
    },
    mixins:[label_value_mixin,_model_mixin,_filter_all_mixin],
    props:{
        value:{
            required:true,
        },
        placeholder:{

        },
        uri:{
            type:String,
            required:true,
        },

    },
}
</script>