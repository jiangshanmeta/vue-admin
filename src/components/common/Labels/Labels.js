export default {
    functional: true,
    props: {
        labelName: {
            type: String,
        },
        component: {
            type: [
                Function, Object,
            ],
            default: null,
        },
        label: {
            type: Object,
        },
    },
    render (h, {
        props, parent,
    }) {
        const labelName = props.labelName;
        if (props.label) {
            const component = props.component;
            const {
                handler,
                config = {},
            } = props.label;
            if (component) {
                const propsData = {
                    labelName: labelName,
                    ...config,
                };
                return (
                    <component
                        {...{
                            props: propsData,
                        }}
                    />
                );
            } else if (handler) {
                return (
                    <span>{handler.call(parent, labelName, config)}</span>
                );
            }
        } else {
            return (
                <span>{labelName}</span>
            );
        }
    },
};
