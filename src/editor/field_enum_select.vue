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
import _model_mixin from "./_model_mixin.js"
import label_value_mixin from "./label_value_mixin.js"

export default{
    name:'field_enum_select',
    mixins:[field_enum_mixin,_model_mixin,label_value_mixin],
    props:{
        placeholder:{

        }
    }
}
</script>