<template>
    <EditorEnumSelect
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :is-candidate-valid="hasCachedOptions"
        v-on="listenersWithoutInput"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin';
import _props_value_mixin from './_props_value_mixin';
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorEnumRelatesSelect',
    components: {
        EditorEnumSelect: () => import('./EditorEnumSelect'),
    },
    mixins: [
        _editor_relates_mixin,
        _props_value_mixin,
        _editor_model_mixin,
    ],
};
</script>
