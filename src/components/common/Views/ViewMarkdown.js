import vueMarkdown from 'vue-markdown';
export default {
    name: 'ViewMarkdown',
    functional: true,
    props: {
        value: {
            type: String,
        },
    },
    render (h, context) {
        return (
            <vueMarkdown {...context.data}>{context.props.value}</vueMarkdown>
        );
    },
};
