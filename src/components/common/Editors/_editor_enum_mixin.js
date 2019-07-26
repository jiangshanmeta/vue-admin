import _validate_option from './_validate_option';

export default {
    mixins: [
        _validate_option,
    ],
    methods: {
        validateOption () {
            if (!this.isCandidateValid) {
                return;
            }

            const allValueSet = this.allValueSet;

            // 对于单选，只有候选项不含该值的情况
            if (!allValueSet.has(this.value)) {
                this.handleInvalidValue(this.value, this.allValue);
            }
        },
    },
};
