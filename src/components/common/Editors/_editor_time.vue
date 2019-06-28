<template>
    <el-date-picker
        v-model="model"
        :type="type"
        :value-format="valueFormat"
        v-bind="$attrs"
    />
</template>

<script>
import _props_value_mixin from './_props_value_mixin.js';
import _editor_model_mixin from './_editor_model_mixin';

export default {
    mixins: [
        _props_value_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
    props: {
        type: {
            type: String,
            required: true,
        },
        valueFormat: {
            type: String,
            default: 'timestamp',
        },
    },
};
</script>
