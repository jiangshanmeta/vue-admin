export default {
    functional: true,
    props: {
        label: {
            type: String,
        },
    },
    render (h, {
        props, scopedSlots, 
    }) {
        if (scopedSlots.default) {
            return scopedSlots.default();
        } else {
            return (
                <span>{props.label}</span>
            );
        }
    },
};
