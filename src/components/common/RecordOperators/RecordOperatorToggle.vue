<template>
    <el-button
        :type="typeMap.get(data[field])"
        v-bind="triggerConfig"
        @click="handleClick"
    >
        {{ textMap.get(data[field]) }}
    </el-button>
</template>

<script>
import {
    logError,
} from '@/widget/utility.js';
export default {
    name: 'RecordOperatorToggle',
    props: {
        data: {
            type: Object,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        descriptor: {
            type: Array,
            required: true,
        },
        reserveFields: {
            type: Array,
            default: function () {
                return [];
            },
        },
        handleToggle: {
            type: Function,
            default: function () {

            },
        },
        triggerConfig: {
            type: Object,
            default () {
                return {};
            },
        },
    },
    computed: {
        textMap () {
            const map = new Map();
            map.set(this.descriptor[0].value, this.descriptor[0].text);
            map.set(this.descriptor[1].value, this.descriptor[1].text);
            return map;
        },
        typeMap () {
            const map = new Map();
            map.set(this.descriptor[0].value, this.descriptor[0].type);
            map.set(this.descriptor[1].value, this.descriptor[1].type);
            return map;
        },
        valueMap () {
            const map = new Map();
            map.set(this.descriptor[0].value, this.descriptor[1].value);
            map.set(this.descriptor[1].value, this.descriptor[0].value);
            return map;
        },
    },
    methods: {
        handleClick () {
            const data = {};
            data[this.field] = this.valueMap.get(this.data[this.field]);
            this.reserveFields.forEach((field) => {
                data[field] = this.data[field];
            });
            new Promise((resolve, reject) => {
                this.handleToggle(resolve, data);
            }).then(() => {
                this.$emit('update');
            }).catch(logError);
        },
    },
};
</script>
