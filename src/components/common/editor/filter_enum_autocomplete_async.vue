<template>
    <filter_enum_autocomplete
        v-model="model"
        v-bind="$attrs"
        :candidate="candidate"
    />
</template>

<script>
import _async_candidate_mixin from './_async_candidate_mixin'
import _computed_model_mixin from './_computed_model_mixin'

export default {
    name: 'FilterEnumAutocompleteAsync',
    components: {
        filter_enum_autocomplete: () => import('./filter_enum_autocomplete'),
    },
    mixins: [
        _async_candidate_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
}
</script>
