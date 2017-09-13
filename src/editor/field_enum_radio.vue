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
import model_mixin from "./model_mixin.js"
import label_value_mixin from "./label_value_mixin.js"

export default{
    name:'field_enum_radio',
    mixins:[field_enum_mixin,model_mixin,label_value_mixin],
}
</script>