export default {
    name: 'EditorText',
    functional: true,
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    render (h, context) {
        return (
            <el-input
                type="textarea"
                {...context.data}
            />
        );
    },
};
