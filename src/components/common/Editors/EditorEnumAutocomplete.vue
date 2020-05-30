<template>
    <el-autocomplete
        v-model="showValue"
        :value-key="labelfield"
        :fetch-suggestions="queryModel"
        v-bind="$attrs"
        @select="handleSelect"
    />
</template>

<script>
// 该组件及衍生组件设计为用户体验增强版的Select，应该在候选项比较多的时候使用，fetchSuggestions也应该是同步方法
import _editor_enum_mixin from './_editor_enum_mixin';
import _computed_value_label_map_mixin from './_computed_value_label_map_mixin';

export default {
    name: 'EditorEnumAutocomplete',
    mixins: [
        _editor_enum_mixin,
        _computed_value_label_map_mixin,
    ],
    inheritAttrs: true,
    props: {
        fetchSuggestions: {
            type: Function,
            default (cb, queryString) {
                const data = queryString ? this.candidate.filter((item) => {
                    return item[this.labelfield].includes(queryString);
                }) : this.candidate;
                cb(data);
            },
        },
    },
    data () {
        return {
            showValue: '',
        };
    },
    watch: {
        value: {
            handler: 'setShowValueByValue',
            immediate: true,
        },
        candidate: {
            handler: 'setShowValueByValue',
            immediate: true,
        },
    },
    methods: {
        queryModel (queryString, cb) {
            // 这一层为了修正this指向 顺便统一参数顺序 cb放在前面
            this.fetchSuggestions(cb, queryString);
        },
        handleSelect (item) {
            this.$emit('input', item[this.valuefield]);
        },
        setShowValueByValue () {
            const value = this.value;
            if (this.valueLabelMap.has(value)) {
                this.showValue = this.valueLabelMap.get(value);
            }
        },
    },
};
</script>
