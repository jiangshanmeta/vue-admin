<template>
    <span>{{ name }} {{ glue }} {{ position }}</span>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        glue: {
            type: String,
            default: ',',
        },
    },
}
</script>
