<template>
    <el-select 
        v-model="model" 
        :placeholder="placeholder"
    >
        <slot></slot>
        <el-option v-for="item in candidate" :key="item[valuefield]" :value="item[valuefield]" :label="item[labelfield]">
        </el-option>
    </el-select>
</template>

<script>
import field_enum_mixin from "./field_enum_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"

export default{
    name:'field_enum_select',
    mixins:[
        field_enum_mixin,
        _computed_model_mixin,
        _props_label_value_mixin,
        _props_placeholder_mixin,
    ],
    props:{

    }
}
</script>