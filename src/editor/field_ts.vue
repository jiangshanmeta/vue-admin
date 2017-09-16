<template>
    <el-date-picker
        type="datetime"
        :placeholder="placeholder"
        format="yyyy-MM-dd HH:mm:ss"
        v-model="currentValue"
        @change="handleChange"
    ></el-date-picker>
</template>

<script>
import ts_mixin from "./ts_mixin"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"

export default{
    name:'field_ts',
    mixins:[
        ts_mixin,
        _props_placeholder_mixin,
    ],
}
</script>