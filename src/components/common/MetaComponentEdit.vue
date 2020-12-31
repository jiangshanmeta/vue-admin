<template>
    <div>
        <Editors
            v-if="record"
            ref="editors"
            :fields="fields"
            :editable-fields="editableFields"
            :record="record"
            mode="edit"
            v-bind="$attrs"
        />
        <div>
            <el-button
                v-bind="cancelBtnConfig"
                @click="doCancel"
            >
                {{ cancelBtnConfig.text }}
            </el-button>
            <el-button
                v-bind="confirmBtnConfig"
                @click="handleConfirmClick"
            >
                {{ confirmBtnConfig.text }}
            </el-button>
        </div>
    </div>
</template>

<script>
import Editors from './Editors/Editors';

import {
    logError,
    hasOwnProperty,
} from '@/widget/utility';

import _edit_mixin from './DocumentOperators/_edit_mixin';

export default {
    name: 'MetaComponentEdit',
    components: {
        Editors,
    },
    mixins: [
        _edit_mixin,
    ],
    props: {
        handleCancel: {
            type: Function,
            default () {
                this.$router.back();
            },
        },
        handleEditSuccess: {
            type: Function,
            default () {
                this.$router.back();
            },
        },
        cancelBtnConfig: {
            type: Object,
            default () {
                return {
                    text: '取消',
                };
            },
        },
        confirmBtnConfig: {
            type: Object,
            default () {
                return {
                    type: 'primary',
                    text: '确认',
                };
            },
        },

    },
    created () {
        this.getEditFields();
    },
    methods: {
        doCancel () {
            this.handleCancel();
        },
        getEditFields () {
            this.getEditInfo(this.data).then(({
                editableFields,
                record,
            }) => {
                editableFields.forEach((field) => {
                    if (!hasOwnProperty(record, field)) {
                        const configDefault = this.fields[field].editor.default;
                        record[field] = typeof configDefault === 'function' ? configDefault.call(this, field) : configDefault;
                    }
                });
                this.editableFields = editableFields;
                this.record = record;
            }).catch(logError);
        },
        handleConfirmClick () {
            this.$refs.editors.validate()
                .then(this.handleConfirm)
                .catch(logError);
        },
        handleConfirm (data) {
            if (this.isUpdating) {
                return;
            }
            this.isUpdating = true;
            this.doEditRequest(this.transformData(data)).then(() => {
                this.handleEditSuccess();
            }).catch(logError).finally(() => {
                this.isUpdating = false;
            });
        },
    },
};
</script>
