<template>
    <el-date-picker
        v-model="currentValue"
        type="date"
        :placeholder="placeholder"
        @change="handleChange"
    >
    </el-date-picker>
</template>

<script>
import ts_mixin from "./ts_mixin"
export default{
    mixins:[ts_mixin]
}
</script>