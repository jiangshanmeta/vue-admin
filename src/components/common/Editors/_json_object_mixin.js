export default {
    props: {
        struct: {
            type: Function,
            default () {
                return [];
            },
        },
        value: {
            required: true,
        },
    },
    computed: {
        model: {
            get () {
                try {
                    return JSON.parse(this.value);
                } catch (e) {
                    const val = this.struct();
                    this.model = val;
                    return val;
                }
            },
            set (val) {
                this.$emit('input', JSON.stringify(val));
            },
        },
    },
};
