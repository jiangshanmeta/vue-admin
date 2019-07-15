export default {
    name: 'ViewEnum',
    functional: true,
    props: {
        data: {
            type: [
                Number, String,
            ],
        },
        enums: {
            type: [
                Object,
                Function,
            ],
            required: true,
        },
    },
    render (h, {
        props,
        parent,
    }) {
        const data = props.data;
        let enums = props.enums;
        if (typeof enums === 'function') {
            enums = enums.call(parent);
        }

        return (
            <span>{enums[data]}</span>
        );
    },
};
