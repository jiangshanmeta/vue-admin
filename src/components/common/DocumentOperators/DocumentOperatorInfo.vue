<template>
    <el-button
        v-bind="triggerConfig"
        @click="handleClick"
    >
        {{ triggerConfig.text }}
    </el-button>
</template>

<script>
import SingletonDocumentOperatorInfoDialog from './SingletonDocumentOperatorInfoDialog';

import {
    logError,
} from '@/widget/utility';

export default {
    name: 'DocumentOperatorInfo',
    props: {
        getDetailInfo: {
            type: Function,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
        triggerConfig: {
            type: Object,
            default () {
                return {};
            },
        },
    },
    state: {
        fieldLayoutList: [],
        record: {},
    },
    methods: {
        handleClick () {
            new Promise((resolve, reject) => {
                this.getDetailInfo(resolve, this.data, reject);
            }).then(({
                fieldLayoutList, record,
            }) => {
                this.fieldLayoutList = fieldLayoutList;
                this.record = record;
                this.$singleton(
                    SingletonDocumentOperatorInfoDialog,
                    {
                        ...this.$attrs,
                        visible: true,
                        fieldLayoutList: this.fieldLayoutList,
                        record: this.record,
                    },
                    this
                );
            }).catch(logError);
        },

    },
};
</script>
