export default {
    name: 'ViewTransform',
    functional: true,
    props: {
        value: {},
        transform: {
            type: Function,
            default: function (data) {
                return data;
            },
        },
    },
    render (h, {
        props,
    }) {
        const {
            value,
            transform,
        } = props;
        return (
            <span>{transform(value)}</span>
        );
    },
};
