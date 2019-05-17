<template>
    <editor_enum_select
        v-model="model"
        :labelfield="labelfield"
        :valuefield="valuefield"
        :candidate="filter_candidate"
        v-bind="$attrs"
    />
</template>

<script>
import _filter_all_mixin from './_filter_all_mixin'
import _computed_model_mixin from './_computed_model_mixin'

export default {
    name: 'FilterEnumSelect',
    components: {
        editor_enum_select: () => import('./editor_enum_select'),
    },
    mixins: [
        _filter_all_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
}
</script>
