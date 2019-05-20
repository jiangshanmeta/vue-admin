import merge from 'deepmerge'

import _props_value_mixin from './_props_value_mixin'

function identity (value) {
    return value
}

export default merge.all([
    _props_value_mixin, {
        props: {
            getModelValue: {
                type: Function,
                default: identity,
            },
            setModelValue: {
                type: Function,
                default: identity,
            },
        },
        computed: {
            model: {
                get () {
                    return this.getModelValue(this.value)
                },
                set (val) {
                // 因为有setModelValue把简单值映射为复杂值的情况
                // 简单值一致，不应该出现新的复杂值
                    if (val !== this.model) {
                        this.$emit('input', this.setModelValue(val))
                    }
                },
            },
        },
    },
])
