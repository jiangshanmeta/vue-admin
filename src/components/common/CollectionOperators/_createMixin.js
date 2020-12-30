export default {
    data () {
        return {
            editableFields: [],
            record: null,
        };
    },
    state: {
        isCreating: false,
    },
    props: {
        fields: {
            type: Object,
            required: true,
        },
        getCreateFields: {
            type: Function,
            required: true,
        },
        doCreateRequest: {
            type: Function,
            required: true,
        },
        transformData: {
            type: Function,
            default (data) {
                return data;
            },
        },
    },
    methods: {
        resetRecord () {
            this.record = this.editableFields.reduce((obj, field) => {
                const configDefault = this.fields[field].editor.default;
                obj[field] = typeof configDefault === 'function' ? configDefault.call(this, field) : configDefault;
                return obj;
            }, {});
        },
    },
};
