<template>
    <div>
        <Editors
            v-if="record"
            ref="editors"
            :fields="fields"
            :editable-fields="editableFields"
            :record="record"
            mode="create"
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
} from '@/widget/utility';

import _createMixin from './CollectionOperators/_createMixin';

export default {
    name: 'MetaComponentCreate',
    components: {
        Editors,
    },
    mixins: [
        _createMixin,
    ],
    props: {
        handleCancel: {
            type: Function,
            default () {
                this.$router.back();
            },
        },
        handleCreateSuccess: {
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
        this.getCreateFields().then((editableFields) => {
            this.editableFields = editableFields;
            this.resetRecord();
        });
    },
    methods: {
        doCancel () {
            this.handleCancel();
        },
        handleConfirmClick () {
            this.$refs.editors.validate()
                .then(this.handleConfirm)
                .catch(logError);
        },
        handleConfirm (data) {
            if (this.isCreating) {
                return;
            }
            this.isCreating = true;
            this.doCreateRequest(this.transformData(data)).then(() => {
                this.handleCreateSuccess();
            }).catch(logError).finally(() => {
                this.isCreating = false;
            });
        },
    },
};
</script>
