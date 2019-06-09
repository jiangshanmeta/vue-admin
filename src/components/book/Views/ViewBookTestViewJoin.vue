<template>
    <span>{{ name }} {{ glue }} {{ position }}</span>
</template>

<script>
export default {
    name:'ViewBookTestViewJoin',
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
};
</script>
