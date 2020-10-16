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
import {
    logError,
} from '@/widget/utility';

import _props_value_mixin from './_props_value_mixin';
import _props_label_value_mixin from './_props_label_value_mixin';

export default {
    name: 'EditorEnumRemoteAutocomplete',
    mixins: [
        _props_value_mixin,
        _props_label_value_mixin,
    ],
    props: {
        fetchSuggestions: {
            type: Function,
            required: true,
        },
        // 一般是编辑的时候 因为有了值 但是无法展示
        getLabelByValue: {
            type: Function,
            required: true,
        },
    },
    data () {
        return {
            showValue: '',
        };
    },
    created () {
        new Promise((resolve) => {
            this.getLabelByValue(resolve, this.value);
        }).then((showValue) => {
            this.showValue = showValue;
        }).catch(logError);
    },
    methods: {
        queryModel (queryString, cb) {
            // 这一层为了修正this指向
            this.fetchSuggestions(cb, queryString);
        },
        handleSelect (item) {
            this.$emit('input', item[this.valuefield]);
            this.showValue = item[this.labelfield];
        },
    },
};
</script>
