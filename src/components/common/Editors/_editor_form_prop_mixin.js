export default {
    props: {
        editableFields: {
            type: Array,
            required: true,
        },
        fieldLayout: {
            type: [
                Function, Array,
            ],
            required: true,
        },
        effectLayoutFields: {
            type: Array,
            default () {
                return [];
            },
        },
        effectValidateFields: {
            type: Array,
            default () {
                return [];
            },
        },
        record: {
            type: Object,
            required: true,
        },
        fields: {
            type: Object,
            required: true,
        },
        autoValidate: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: String,
            required: true,
        },
        recordWatch: {
            type: Function,
            default () {
                return [];
            },
        },
    },
}
;
