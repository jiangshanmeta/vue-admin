<template>
    <el-select 
        v-model="model" 
        :placeholder="placeholder"
        :disabled="disabled"
    >
        <slot></slot>
        <el-option 
            v-for="item in candidate" 
            :key="item[valuefield]" 
            :value="item[valuefield]" 
            :label="item[labelfield]"
        ></el-option>
    </el-select>
</template>

<script>
import _field_enum_mixin from "./_field_enum_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_disabled_mixin from "./_props_disabled_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"

export default{
    name:'field_enum_select',
    mixins:[
        _field_enum_mixin,
        _computed_model_mixin,
        _props_disabled_mixin,
        _props_label_value_mixin,
        _props_placeholder_mixin,
    ],
}
</script>