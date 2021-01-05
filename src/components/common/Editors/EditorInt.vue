<template>
    <EditorNumber
        ref="EditorNumber"
        v-bind="$attrs"
        v-model="model"
        v-on="listenersWithoutInput"
    />
</template>

<script>
import _listeners_without_input_mixin from './_listeners_without_input_mixin';

export default {
    name: 'EditorInt',
    components: {
        EditorNumber: () => import('./EditorNumber'),
    },
    mixins: [
        _listeners_without_input_mixin,
    ],
    props: {
        value: {
            type: Number,
            required: true,
            validator (val) {
                return Number.isInteger(val);
            },
        },
    },
    computed: {
        model: {
            get () {
                return this.value;
            },
            set (val) {
                if (Number.isInteger(val)) {
                    this.$emit('input', val);
                } else {
                    this.$nextTick(() => {
                        // 有点hack element-ui底层的坑
                        const inputNumber = this.$refs.EditorNumber.$refs.number;
                        inputNumber.setCurrentValue(Number.parseInt(val));
                    });
                }
            },
        },
    },
};
</script>
