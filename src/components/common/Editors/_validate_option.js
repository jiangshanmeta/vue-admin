import _props_value_mixin from './_props_value_mixin';
import _candidate_mixin from './_candidate_mixin';

export default {
    mixins: [
        _props_value_mixin,
        _candidate_mixin,
    ],
    props: {
        isCandidateValid: {
            type: Boolean,
            default: true,
        },
        handleInvalidValue: {
            type: Function,
        },
    },
    computed: {
        allValueSet () {
            return this.candidate.reduce((set, item) => {
                return set.add(item[this.valuefield]);
            }, new Set());
        },
        allValue () {
            return [
                ...this.allValueSet,
            ];
        },
    },
    created () {
        if (this.handleInvalidValue) {
            this.$watch(() => {
                return this.candidate;
            }, this.validateOption, {
                immediate: true,
            });
        }
    },

};

// 去重的方法
export function unique (valueArr) {
    return [
        ...new Set(valueArr),
    ];
}

// 清除不在候选项的选择的数据
export function clearInvalidData (valueArr, optionArr) {
    const set = new Set(optionArr);
    const resultSet = new Set();
    for (let item of valueArr) {
        if (set.has(item)) {
            resultSet.add(item);
        }
    }
    return [
        ...resultSet,
    ];
}
