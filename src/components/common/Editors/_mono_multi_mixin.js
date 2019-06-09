export default {
    props: {
        value: {
            type: [
                Object, String,
            ],
            required: true,
        },
        isMonoValid: {
            type: [
                Boolean, Function,
            ],
            default () {
                return true;
            },
        },
        monoStruct: {
            type: Function,
            default () {
                return {};
            },
        },
    },
    computed: {
        model: {
            get () {
                if (this.isMonoValid(this.value)) {
                    return [
                        this.value,
                    ];
                }
                return [];
            },
            set (val) {
                if (!val.length) {
                    this.$emit('input', this.monoStruct());
                } else {
                    this.$emit('input', val[val.length - 1]);
                }
            },
        },
    },
};
