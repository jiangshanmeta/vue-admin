<template>
    <el-input-number
        ref="number"
        v-model="model"
        :controls="false"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
    />
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';
import _props_value_number_mixin from './_props_value_number_mixin';

export default {
    name: 'EditorNumber',
    mixins: [
        _editor_model_mixin,
        _props_value_number_mixin,
    ],
};
</script>
