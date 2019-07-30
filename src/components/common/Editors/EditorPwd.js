export default {
    name: 'EditorPwd',
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
                type="password"
                {...context.data}
            />
        );
    },
};
