export default {
    name: 'view_transform',
    functional: true,
    props: {
        data: {},
        transform: {
            type: Function,
            default: function (data) {
                return data
            },
        },
    },
    render (h, { props, }) {
        const {
            data,
            transform,
        } = props
        return (
            <span>{transform(data)}</span>
        )
    },
}
