<template>
    <el-radio-group v-model="model">
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
import field_enum_mixin from "./field_enum_mixin.js"
import _model_mixin from "./_model_mixin.js"
import _label_value_mixin from "./_label_value_mixin.js"

export default{
    name:'field_enum_radio',
    mixins:[field_enum_mixin,_model_mixin,_label_value_mixin],
}
</script>