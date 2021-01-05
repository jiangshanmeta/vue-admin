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

import _createMixin from './_createMixin';

export default {
    name: 'CollectionOperatorCreate',
    mixins: [
        _createMixin,
    ],
    props: {
        triggerConfig: {
            type: Object,
            default () {
                return {};
            },
        },
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
                    fields: this.fields,
                    editableFields: this.editableFields,
                    record: this.record,
                    handleConfirm: this.handleConfirm,
                    mode: 'create',
                },
                this.$root
            );
            this.singletonDialogEditors.show();
        },
        handleClick () {
            if (this.editableFields.length === 0) {
                this.getCreateFields().then((editableFields) => {
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

            this.doCreateRequest(this.transformData(data)).then(() => {
                this.singletonDialogEditors.hide();
                this.$emit('update');
            }).catch(logError).finally(() => {
                this.isCreating = false;
            });
        },
    },
};
</script>
