function identity (value) {
    return value;
}

export default {
    props: {
        value: {
            required: true,
        },
        getModelValue: {
            type: Function,
            default: identity,
        },
        setModelValue: {
            type: Function,
            default: identity,
        },
    },
    created () {
        const _this = this;
        Object.defineProperty(this, 'model', {
            get () {
                return _this.getModelValue(_this.value);
            },
            set (val) {
                // 因为有setModelValue把简单值映射为复杂值的情况
                // 简单值一致，不应该出现新的复杂值
                if (val !== _this.model) {
                    _this.$emit('input', _this.setModelValue(val));
                }
            },
        });
    },
};
