export default {
    props: {
        fields: {
            type: Object,
            required: true,
        },
        fieldLayoutList: {
            type: Array,
            required: true,
        },
        record: {
            type: Object,
            required: true,
        },
        fieldsLayoutConfig: {
            type: Object,
            default () {
                return {};
            },
        },
    },
    computed: {
        infoRenderProp () {
            return {
                fields: this.fields,
                fieldLayoutList: this.fieldLayoutList,
                record: this.record,
                fieldsLayoutConfig: this.fieldsLayoutConfig,
            };
        },
    },
};
