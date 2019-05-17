<template>
    <field_file_multi
        v-model="model"
        list-type="picture-card"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        v-bind="$attrs"
    >
        <template #default>
            <slot name="default" />
        </template>

        <template #tip>
            <slot name="tip" />
        </template>
    </field_file_multi>
</template>

<script>
import field_file_multi from './field_file_multi'

import _computed_model_mixin from './_computed_model_mixin'
import _props_value_array_mixin from './_props_value_array_mixin'

export default {
    name: 'FieldImageMulti',
    components: {
        field_file_multi,
    },
    mixins: [
        _computed_model_mixin,
        _props_value_array_mixin,
    ],
    inheritAttrs: true,
}

</script>
