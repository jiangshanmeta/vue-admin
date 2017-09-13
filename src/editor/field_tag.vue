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
import model_mixin from "./model_mixin.js"
import label_value_mixin from "./label_value_mixin.js"

export default{
    name:'field_tag',
    mixins:[field_tag_mixin,model_mixin,label_value_mixin],
}
</script>