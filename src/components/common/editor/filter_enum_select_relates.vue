<template>
    <filter_enum_select
        v-model="model"
        :candidate="finalOptions"
        :is-candidate-valid="hasCachedOptions"
        v-bind="$attrs"
    />
</template>

<script>
import _editor_relates_mixin from './_editor_relates_mixin'
import _computed_model_mixin from './_computed_model_mixin'

export default {
    name: 'FilterEnumSelectRelates',
    components: {
        filter_enum_select: () => import('./filter_enum_select'),
    },
    mixins: [
        _editor_relates_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
}
</script>
