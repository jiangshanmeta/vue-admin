<template>
    <editor_enum_autocomplete
        v-model="model"
        :candidate="filter_candidate"
        :labelfield="labelfield"
        :valuefield="valuefield"
        v-bind="$attrs"
    />
</template>

<script>
import _filter_all_mixin from './_filter_all_mixin'
import _computed_model_mixin from './_computed_model_mixin'

export default {
    name: 'FilterEnumAutocomplete',
    components: {
        editor_enum_autocomplete: () => import('./editor_enum_autocomplete'),
    },
    mixins: [
        _filter_all_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
    props: {
        candidate: {
            type: Array,
            required: true,
        },
    },
}
</script>
