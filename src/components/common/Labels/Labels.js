export default {
    functional: true,
    props: {
        label: {
            type: String,
        },
        component:{
            type:[
                Function,Object,
            ],
            default:null,
        },
        config:{
            type:Object,
        },
    },
    render (h, {
        props, 
    }) {
        const {
            label,
            component,
            config = {},
        } = props;

        if (component) {
            const propsData = {
                label,
                ...config,
            };

            return (
                <component
                    {...{
                        props:propsData,
                    }}
                />
            );
        } else {
            return (
                <span>{label}</span>
            );
        }
    },
};
