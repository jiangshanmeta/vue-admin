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
import _label_value_mixin from "./_label_value_mixin.js"

export default{
    name:'field_enum_select',
    mixins:[field_enum_mixin,_model_mixin,_label_value_mixin],
    props:{
        placeholder:{

        }
    }
}
</script>