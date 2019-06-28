<template>
    <editor_time
        v-model="model"
        type="year"
        :value-format="valueFormat"
        v-bind="$attrs"
    />
</template>

<script>
import _props_value_mixin from './_props_value_mixin.js';
import _editor_model_mixin from './_editor_model_mixin.js';

export default {
    name: 'EditorTimeYear',
    components: {
        editor_time: () => import('./_editor_time'),
    },
    mixins: [
        _props_value_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
    props: {
        valueFormat: {
            type: String,
            default: 'yyyy',
        },
    },
};
</script>
