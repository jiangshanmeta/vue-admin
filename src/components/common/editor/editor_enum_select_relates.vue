<template>
    <editor_enum_select
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :is-candidate-valid="hasCachedOptions"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin.js'
import _props_value_mixin from './_props_value_mixin.js'
import _computed_model_mixin from './_computed_model_mixin.js'

export default {
    name: 'EditorEnumSelectRelates',
    components: {
        editor_enum_select: () => import('./editor_enum_select'),
    },
    mixins: [
        _editor_relates_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
}
</script>
