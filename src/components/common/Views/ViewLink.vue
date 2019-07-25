<template functional>
    <router-link
        :to="props.getLink.call(parent,props.data)"
        v-bind="data.props"
    >
        {{ props.getText.call(parent,props.data) }}
    </router-link>
</template>

<script>
export default {
    name: 'ViewLink',
    props: {
        data: {
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
