<template>
    <EditorNumber
        ref="EditorNumber"
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _props_value_number_mixin from './_props_value_number_mixin';

export default {
    name: 'EditorInt',
    components: {
        EditorNumber: () => import('./EditorNumber'),
    },
    mixins: [
        _props_value_number_mixin,
    ],
    inheritAttrs: true,
    computed: {
        model: {
            get () {
                return this.value;
            },
            set (val) {
                const intVal = Number.parseInt(val);

                if (intVal !== val) {
                    this.$nextTick(() => {
                        const inputNumber = this.$refs.EditorNumber.$refs.number;
                        // 如果不修改input-number的currentValu值
                        // input-number的值为非法值
                        // 由于input组件监听了input-number组件的value
                        // 会被重写为非法值
                        inputNumber.setCurrentValue(intVal);
                        inputNumber.$refs.input.setCurrentValue(intVal);
                    });
                } else {
                    this.$emit('input', intVal);
                }
            },
        },
    },
};
</script>
