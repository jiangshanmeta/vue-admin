<template>
    <editor_enum_radio
        v-model="model"
        :candidate="finalOptions"
        v-bind="$attrs"
        :is-candidate-valid="hasCachedOptions"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin'
import _computed_model_mixin from './_computed_model_mixin'

export default {
    name: 'EditorEnumRadioRelates',
    components: {
        editor_enum_radio: () => import('./editor_enum_radio'),
    },
    mixins: [
        _editor_relates_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
}
</script>
