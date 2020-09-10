export default {
    name: 'ViewHTML',
    functional: true,
    props: {
        value: {
            type: String,
        },
    },
    render (h, {
        props,
    }) {
        return h('div', {
            domProps: {
                innerHTML: props.value,
            },
        });
    },
};
