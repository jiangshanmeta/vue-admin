<template>
    <el-button
        v-bind="triggerConfig"
        @click="handleClick"
    >
        {{ triggerConfig.text }}
    </el-button>
</template>

<script>
import {
    logError,
} from '@/widget/utility';

import SingletonDialogEditors from '@/components/common/Editors/SingletonDialogEditors';

export default {
    name: 'CollectionOperatorCreate',
    props: {
        fields: {
            type: Object,
            required: true,
        },
        getCreateFields: {
            type: Function,
            required: true,
        },
        doCreateRequest: {
            type: Function,
            required: true,
        },
        triggerConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        transformData: {
            type: Function,
            default (data) {
                return data;
            },
        },
    },
    state: {
        editableFields: [],
        record: {},
        isCreating: false,
    },
    singleton: {
        singletonDialogEditors: null,
    },
    methods: {
        showDialog () {
            this.singletonDialogEditors = this.$singleton(
                SingletonDialogEditors,
                {
                    ...this.$attrs,
                    visible: true,
                    fields: this.fields,
                    editableFields: this.editableFields,
                    record: this.record,
                    handleConfirm: this.handleConfirm,
                    mode: 'create',
                },
                this.$root
            );
        },
        resetRecord () {
            this.record = this.editableFields.reduce((obj, field) => {
                const configDefault = this.fields[field].editor.default;
                obj[field] = typeof configDefault === 'function' ? configDefault.call(this, field) : configDefault;
                return obj;
            }, {});
        },
        handleClick () {
            if (this.editableFields.length === 0) {
                new Promise((resolve, reject) => {
                    this.getCreateFields(resolve);
                }).then((editableFields) => {
                    this.editableFields = editableFields;
                    this.resetRecord();
                    this.showDialog();
                }).catch(logError);
            } else {
                this.resetRecord();
                this.showDialog();
            }
        },
        handleConfirm (data) {
            if (this.isCreating) {
                return;
            }
            this.isCreating = true;

            new Promise((resolve) => {
                this.doCreateRequest(resolve, this.transformData(data));
            }).then(() => {
                this.singletonDialogEditors.visible = false;
                this.$emit('update');
            }).catch(logError).finally(() => {
                this.isCreating = false;
            });
        },
    },
};
</script>
