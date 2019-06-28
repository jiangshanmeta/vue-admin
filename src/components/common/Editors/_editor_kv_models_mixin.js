// 所谓kv型editor 是其value值是一个对象(kv) 其key不会变化
export default {
    props: {
        value: {
            required: true,
        },
    },
    created () {
        this.models = {};
        const _this = this;
        Object.keys(this.value).forEach((key) => {
            Object.defineProperty(this.models, key, {
                get () {
                    return _this.value[key];
                },
                set (val) {
                    const data = {
                        ..._this.value,
                    };
                    data[key] = val;
                    _this.$emit('input', data);
                },
            });
        });
    },
};
