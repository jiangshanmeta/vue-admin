<template>
    <editor_array_checkbox
        v-model="model"
        :candidate="candidate"
        :is-candidate-valid="!isRequest"
        v-bind="$attrs"
    />
</template>

<script>
import _async_candidate_mixin from './_async_candidate_mixin'
import _computed_model_mixin from './_computed_model_mixin'
import _props_value_array_mixin from './_props_value_array_mixin'

export default {
    name: 'EditorArrayCheckboxAsync',
    components: {
        editor_array_checkbox: () => import('./editor_array_checkbox'),
    },
    mixins: [
        _async_candidate_mixin,
        _computed_model_mixin,
        _props_value_array_mixin,
    ],
    inheritAttrs: true,
}
</script>
