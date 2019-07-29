<template>
    <div>
        <el-button
            v-bind="triggerConfig"
            @click="handleClick"
        >
            {{ triggerConfig.text }}
        </el-button>
        <input
            ref="input"
            type="file"
            :multiple="false"
            accept=".csv"
            style="display: none;"
            @change="handleChange"
        >
    </div>
</template>

<script>
import csvjs from 'csv-js';
import {
    logError,
} from '@/widget/utility.js';
export default {
    name: 'ListOperatorCsv',
    props: {
        triggerConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        handleData: {
            type: Function,
            default () {

            },
        },

    },
    methods: {
        handleClick () {
            this.$refs.input.value = null;
            this.$refs.input.click();
        },
        handleChange (ev) {
            var reader = new FileReader();
            reader.onload = function (e) {
                new Promise((resolve, reject) => {
                    this.handleData(resolve, csvjs.parse(e.target.result));
                }).then(() => {
                    this.$emit('update');
                }).catch(logError);
            }.bind(this);
            reader.readAsText(ev.target.files[0]);
        },
    },
};
</script>
