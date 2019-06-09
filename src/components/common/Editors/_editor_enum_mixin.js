import merge from 'deepmerge';

import _validate_option from './_validate_option';

export default merge.all([
    _validate_option, {
        methods: {
            validateOption () {
                if (!this.isCandidateValid) {
                    return;
                }

                const allvalueSet = this.allvalueSet;

                // 对于单选，只有候选项不含该值的情况
                if (!allvalueSet.has(this.value)) {
                    this.handleInvalidValue.call(this, this.value, [
                        ...allvalueSet,
                    ]);
                }
            },
        },
    },
]);
