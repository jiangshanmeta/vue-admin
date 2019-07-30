import EditorEnumSelect from './EditorEnumSelect';

const candidate = Object.freeze([
    {
        value: 0,
        label: '男',
    },
    {
        value: 1,
        label: '女',
    },
]);

export default {
    name: 'EditorGender',
    functional: true,
    props: {
        value: {
            type: Number,
            required: true,
        },
    },
    render (h, context) {
        return (
            <EditorEnumSelect
                candidate={candidate}
                {...context.data}
            />
        );
    },
};
