<template>
    <EditorNumber
        ref="EditorNumber"
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
export default {
    name: 'EditorInt',
    components: {
        EditorNumber: () => import('./EditorNumber'),
    },
    inheritAttrs: true,
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
