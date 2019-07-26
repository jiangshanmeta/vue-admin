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

            const valueSet = new Set();

            for (let item of this.value) {
                // 候选项没有该值，按无效处理
                if (!allValueSet.has(item)) {
                    return this.handleInvalidValue(this.value, this.allValue);
                }

                // 有重复的，按无效处理
                if (valueSet.has(item)) {
                    return this.handleInvalidValue(this.value, this.allValue);
                }

                valueSet.add(item);
            }
        },
    },
};
