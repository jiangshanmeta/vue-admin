<template>
    <div>
        <el-input
            v-model="model"
            :placeholder="placeholder"
            style="width:50%;"
        />
        {{ msg }}
    </div>
</template>

<script>
/* eslint-disable  */
export default {
    name: 'Username',
    props: {
        value: {
            required: true,

        },
        msg: {

        },
        placeholder: {

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
