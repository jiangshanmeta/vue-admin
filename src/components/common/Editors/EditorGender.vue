<template>
    <EditorEnumSelect
        v-model="model"
        :candidate="candidate"
        v-bind="$attrs"
    />
</template>

<script>
import _props_value_number_mixin from './_props_value_number_mixin';
import _editor_model_mixin from './_editor_model_mixin';

const genderCandidate = Object.freeze([
    {
        value: 0,
        label: '男',
    },
    {
        value: 1,
        label: '女',
    },
]);

export default {
    name: 'EditorGender',
    components: {
        EditorEnumSelect: () => import('./EditorEnumSelect'),
    },
    config: {
        candidate: genderCandidate,
    },
    mixins: [
        _editor_model_mixin,
        _props_value_number_mixin,
    ],
    inheritAttrs: true,
};
</script>
