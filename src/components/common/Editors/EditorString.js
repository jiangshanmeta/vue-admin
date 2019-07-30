export default {
    name: 'EditorString',
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
                type="text"
                {...context.data}
            />
        );
    },
};
