<template>
    <el-date-picker
         type="year"
         :placeholder="placeholder"
         v-model="currentValue"
         @change="handleChange"
    ></el-date-picker>
</template>

<script>
import ts_mixin from "./ts_mixin"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
export default{
    name:'field_year',
    mixins:[
        ts_mixin,
        _props_placeholder_mixin,
    ],
}
</script>