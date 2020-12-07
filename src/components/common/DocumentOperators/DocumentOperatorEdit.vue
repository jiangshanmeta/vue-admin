<template>
    <el-button
        v-bind="triggerConfig"
        @click="getEditFields"
    >
        {{ triggerConfig.text }}
    </el-button>
</template>

<script>
import _id_mixin from '@/mixins/document/_id_mixin';
import {
    logError,
    hasOwnProperty,
} from '@/widget/utility';

import SingletonDialogEditors from '@/components/common/Editors/SingletonDialogEditors';

export default {
    name: 'DocumentOperatorEdit',
    mixins: [
        _id_mixin,
    ],
    props: {
        data: {
            type: Object,
            required: true,
        },
        fields: {
            type: Object,
            required: true,
        },
        getEditInfo: {
            type: Function,
            required: true,
        },
        doEditRequest: {
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
            default: function (data) {
                return data;
            },
        },
    },
    state: {
        editableFields: [],
        record: {},
        isUpdating: false,
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
                    mode: 'edit',
                },
                this.$root
            );
        },
        getEditFields () {
            new Promise((resolve, reject) => {
                this.getEditInfo(resolve, this.data, reject);
            }).then(({
                editableFields, record,
            }) => {
                editableFields.forEach((field) => {
                    if (!hasOwnProperty(record, field)) {
                        const configDefault = this.fields[field].editor.default;
                        record[field] = typeof configDefault === 'function' ? configDefault.call(this, field) : configDefault;
                    }
                });

                this.editableFields = editableFields;
                this.record = record;
                this.showDialog();
            }).catch(logError);
        },
        handleConfirm (data) {
            if (this.isUpdating) {
                return;
            }
            this.isUpdating = true;
            new Promise((resolve, reject) => {
                this.doEditRequest(resolve, this.transformData(data), reject);
            }).then(() => {
                this.singletonDialogEditors.visible = false;
                this.$emit('update');
            }).catch(logError).finally(() => {
                this.isUpdating = false;
            });
        },
    },
};
</script>
