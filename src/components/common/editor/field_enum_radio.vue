<template>
    <el-radio-group
        v-model="model"
        v-bind='$attrs'
    >
        <el-radio
            v-for="item in candidate"
            :key="item[valuefield]"
            :label="item[valuefield]"
        >
            {{item[labelfield]}}
        </el-radio>
    </el-radio-group>
</template>

<script>
import _field_enum_mixin from "./_field_enum_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _validate_option_mono from "./_validate_option_mono"

export default{
    name:'field_enum_radio',
    inheritAttrs:true,
    mixins:[
        _field_enum_mixin,
        _computed_model_mixin,
        _props_label_value_mixin,
        _validate_option_mono,
    ],
}
</script>