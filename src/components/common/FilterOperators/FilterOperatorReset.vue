<template>
    <el-button
        :type="type"
        :size="size"
        @click="handleClick"
    >
        {{ btnText }}
    </el-button>
</template>

<script>
export default {
    name: 'FilterOperatorReset',
    inject: [
        'filtersComponent',
    ],
    props: {
        type: {
            type: String,
            default: 'warning',
        },
        size: {
            type: String,
            default: '',
        },
        btnText: {
            type: String,
            default: '重置',
        },
    },
    methods: {
        handleClick () {
            this.filtersComponent.resetValue();
        },
    },
};
</script>
