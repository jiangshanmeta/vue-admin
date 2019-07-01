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

            const valueSet = new Set();

            for (let item of this.value) {
            // 候选项没有该值，按无效处理
                if (!allvalueSet.has(item)) {
                    return this.handleInvalidValue(this.value, [
                        ...allvalueSet,
                    ]);
                }

                // 有重复的，按无效处理
                if (valueSet.has(item)) {
                    return this.handleInvalidValue(this.value, [
                        ...allvalueSet,
                    ]);
                }

                valueSet.add(item);
            }
        },
    },
};
