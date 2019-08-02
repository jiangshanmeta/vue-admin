<template functional>
    <component
        :is="props.tag"
        v-bind="props.triggerConfig"
        @click="parent.$router.push(props.getLink.call(parent,props.data))"
    >
        {{ typeof props.getText === 'function'?props.getText.call(parent,props.data):props.getText }}
    </component>
</template>

<script>
export default {
    name: 'DocumentOperatorLink',
    props: {
        data: {
            type: Object,
            required: true,
        },
        tag: {
            type: String,
            default: 'a',
        },
        getLink: {
            type: Function,
            required: true,
        },
        getText: {
            type: [
                Function, String,
            ],
            required: true,
        },
        triggerConfig: {
            type: Object,
            default () {
                return {};
            },
        },
    },
};
</script>
