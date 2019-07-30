<template>
    <EditorEnumSelect
        v-model="model"
        :candidate="candidate"
        v-bind="$attrs"
    />
</template>

<script>
import _props_value_number_mixin from './_props_value_number_mixin';
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorBool',
    components: {
        EditorEnumSelect: () => import('./EditorEnumSelect'),
    },
    mixins: [
        _editor_model_mixin,
        _props_value_number_mixin,
    ],
    props: {
        trueLabel: {
            type: String,
            default: '是',
        },
        trueValue: {
            type: [
                String, Boolean, Number,
            ],
            default: 1,
        },
        falseLabel: {
            type: String,
            default: '否',
        },
        falseValue: {
            type: [
                String, Boolean, Number,
            ],
            default: 0,
        },
    },
    computed: {
        candidate () {
            return [
                {
                    value: this.falseValue,
                    label: this.falseLabel,
                },
                {
                    value: this.trueValue,
                    label: this.trueLabel,
                },
            ];
        },
    },
};
</script>
