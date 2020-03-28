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
                this.getEditInfo(resolve, this.data);
            }).then(({
                editableFields, record,
            }) => {
                editableFields.forEach((field) => {
                    if (!record.hasOwnProperty(field)) {
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
            new Promise((resolve, reject) => {
                this.doEditRequest(resolve, this.transformData(data));
            }).then(() => {
                this.singletonDialogEditors.visible = false;
                this.$emit('update');
            }).catch(logError);
        },
    },
};
</script>
