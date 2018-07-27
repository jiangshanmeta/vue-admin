<template>
    <el-checkbox-group
        v-model="model"
        v-bind="$attrs"
    >
        <el-checkbox 
            v-for="item in candidate" 
            :key="item[valuefield]" 
            :label="item[valuefield]"
        >
            {{item[labelfield]}}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script>
import _validate_option_multi from "./_validate_option_multi"
import _computed_model_mixin from "./_computed_model_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _props_candidate_mixin from "./_props_candidate_mixin"

export default{
    name:'field_tag',
    mixins:[
        _validate_option_multi,
        _computed_model_mixin,
        _props_label_value_mixin,
        _props_value_array_mixin,
        _props_candidate_mixin,
    ],

}
</script>