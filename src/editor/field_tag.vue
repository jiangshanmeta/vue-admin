<template>
    <el-checkbox-group v-model="model">
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
import field_tag_mixin from "./field_tag_mixin.js"
import _model_mixin from "./_model_mixin.js"
import _label_value_mixin from "./_label_value_mixin.js"

export default{
    name:'field_tag',
    mixins:[field_tag_mixin,_model_mixin,_label_value_mixin],
}
</script>