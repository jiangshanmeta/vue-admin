export default {
    name: 'ViewHTML',
    functional: true,
    props: {
        data: {
            type: String,
        },
    },
    render (h, {
        props,
    }) {
        return h('div', {
            domProps: {
                innerHTML: props.data,
            },
        });
    },
};
