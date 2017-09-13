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

export default{
    name:'field_year',
    mixins:[ts_mixin],
}
</script>