export default {
    name: 'ViewEnum',
    functional: true,
    props: {
        value: {
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
        const value = props.value;
        let enums = props.enums;
        if (typeof enums === 'function') {
            enums = enums.call(parent);
        }

        return (
            <span>{enums[value]}</span>
        );
    },
};
