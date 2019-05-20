<template>
    <EditorArrayCheckbox
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :is-candidate-valid="hasCachedOptions"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin'
import _computed_model_mixin from './_computed_model_mixin'
import _props_value_array_mixin from './_props_value_array_mixin'

export default {
    name: 'EditorArrayRelatesCheckbox',
    components: {
        EditorArrayCheckbox: () => import('./EditorArrayCheckbox'),
    },
    mixins: [
        _editor_relates_mixin,
        _computed_model_mixin,
        _props_value_array_mixin,
    ],
    inheritAttrs: true,
}
</script>
