<template>
    <el-select
        v-model="model"
        v-bind="$attrs"
    >
        <el-option 
            v-for="item in candidate" 
            :key="item[valuefield]" 
            :value="item[valuefield]" 
            :label="item[labelfield]"
        ></el-option>
    </el-select>
</template>

<script>
import _editor_enum_mixin from "./_editor_enum_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:'editor_enum_select',
    inheritAttrs:true,
    mixins:[
        _editor_enum_mixin,
        _computed_model_mixin,
    ],
}
</script>