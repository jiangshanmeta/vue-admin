<template>
    <editor_enum_select
        v-model="model"
        :candidate="candidate"
        :is-candidate-valid="!isRequest"
        v-bind="$attrs"
    >
        <template>
            <slot />
        </template>
    </editor_enum_select>
</template>

<script>
import _async_candidate_mixin from './_async_candidate_mixin.js'
import _props_value_mixin from './_props_value_mixin'
import _computed_model_mixin from './_computed_model_mixin.js'

export default {
    name: 'EditorEnumSelectAsync',
    components: {
        editor_enum_select: () => import('./editor_enum_select'),
    },
    mixins: [
        _async_candidate_mixin,
        _props_value_mixin,
        _computed_model_mixin,
    ],
    inheritAttrs: true,
}
</script>
