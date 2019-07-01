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

            const allvalueSet = this.allvalueSet;

            // 对于单选，只有候选项不含该值的情况
            if (!allvalueSet.has(this.value)) {
                this.handleInvalidValue(this.value, [
                    ...allvalueSet,
                ]);
            }
        },
    },
};
