<template>
    <editor_enum_radio
        v-model="model"
        :candidate="candidate"
        :is-candidate-valid="!isRequest"
        v-bind="$attrs"
    />
</template>

<script>
import _props_value_mixin from './_props_value_mixin'
import _computed_model_mixin from './_computed_model_mixin.js'
import _async_candidate_mixin from './_async_candidate_mixin.js'

export default {
    name: 'EditorEnumRadioAsync',
    components: {
        editor_enum_radio: () => import('./editor_enum_radio'),
    },
    mixins: [
        _computed_model_mixin,
        _async_candidate_mixin,
        _props_value_mixin,
    ],
    inheritAttrs: true,
}
</script>
