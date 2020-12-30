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
        fieldsLayoutConfig: {
            type: Object,
            default () {
                return {};
            },
        },
    },
    computed: {
        editorRenderProp () {
            return {
                fields: this.fields,
                editableFields: this.editableFields,
                fieldLayout: this.fieldLayout,
                effectLayoutFields: this.effectLayoutFields,
                record: this.record,
                autoValidate: this.autoValidate,
                mode: this.mode,
                recordWatch: this.recordWatch,
                effectValidateFields: this.effectValidateFields,
                fieldsLayoutConfig: this.fieldsLayoutConfig,
            };
        },
    },
};
