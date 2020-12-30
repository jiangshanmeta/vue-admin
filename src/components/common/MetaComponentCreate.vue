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
            <el-button @click="handleCancel">
                取消
            </el-button>
            <el-button
                type="primary"
                @click="handleConfirmClick"
            >
                确认
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
    },
    created () {
        this.getCreateFields().then((editableFields) => {
            this.editableFields = editableFields;
            this.resetRecord();
        });
    },
    methods: {
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
