<template>
    <span>
        <el-input v-model="model" />
        {{ msg }}
    </span>
</template>

<script>
export default {
    name: 'FilterUserTestCustomFilter',
    props: {
        value: {
            type: String,
            required: true,
        },
        msg: {
            type: String,
            required: true,
        },
    },
    computed: {
        model: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit('input', val);
            },
        },
    },
};
</script>
