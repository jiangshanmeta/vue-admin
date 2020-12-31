export default {
    data () {
        return {
            record: null,
        };
    },
    state: {
        editableFields: [],
        isUpdating: false,
    },
    props: {
        fields: {
            type: Object,
            required: true,
        },
        getEditInfo: {
            type: Function,
            required: true,
        },
        doEditRequest: {
            type: Function,
            required: true,
        },
        transformData: {
            type: Function,
            default: function (data) {
                return data;
            },
        },
    },
};
