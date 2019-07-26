<template>
    <el-autocomplete
        :value="showValue"
        :value-key="labelfield"
        :fetch-suggestions="queryModel"
        v-bind="$attrs"
        @select="handleSelect"
        @input="handleInput"
    />
</template>

<script>
import _editor_enum_mixin from './_editor_enum_mixin';
import _computed_value_label_map_mixin from './_computed_value_label_map_mixin';

export default {
    name: 'EditorEnumAutocomplete',
    mixins: [
        _editor_enum_mixin,
        _computed_value_label_map_mixin,
    ],
    inheritAttrs: true,
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
            const data = queryString ? this.candidate.filter((item) => {
                return item[this.labelfield].includes(queryString);
            }) : this.candidate;
            cb(data);
        },
        handleInput (value) {
            this.showValue = value;
        },
        handleSelect (item) {
            this.$emit('input', item[this.valuefield]);
            this.setShowValueByValue();
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
