<template functional>
    <router-link
        :to="props.getLink.call(parent,props.value)"
        v-bind="data.props"
    >
        {{ props.getText.call(parent,props.value) }}
    </router-link>
</template>

<script>
export default {
    name: 'ViewLink',
    props: {
        value: {
            type: [
                String, Number, Object,
            ],
            required: true,
        },
        getLink: {
            type: Function,
            required: true,
        },
        getText: {
            type: Function,
            required: true,
        },
    },
};
</script>
