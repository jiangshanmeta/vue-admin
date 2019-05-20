<template>
    <span>
        <el-input v-model="model" />
        {{ msg }}
    </span>
</template>

<script>
/* eslint-disable  */
export default {
    name: 'FilterUserTestCustomFilter',
    props: {
        value: {

        },
        msg: {

        },
    },
    computed: {
        model: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            },
        },
    },
}
</script>
