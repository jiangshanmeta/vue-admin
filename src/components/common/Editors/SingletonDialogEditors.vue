<template>
    <el-dialog
        :visible.sync="visible"
        v-bind="dialogConfig"
    >
        <Editors
            ref="editors"
            v-bind="$attrs"
            :fields="fields"
            :editable-fields="editableFields"
            :field-layout="fieldLayout"
            :effect-layout-fields="effectLayoutFields"
            :record="record"
            :auto-validate="autoValidate"
            :mode="mode"
        />
        <template #footer>
            <el-button
                v-bind="cancelBtnConfig"
                @click="visible = false"
            >
                {{ cancelBtnConfig.text }}
            </el-button>
            <el-button
                v-bind="confirmBtnConfig"
                @click="doConfirm"
            >
                {{ confirmBtnConfig.text }}
            </el-button>
        </template>
    </el-dialog>
</template>

<script>
import Editors from './Editors';

export default {
    name: 'SingletonDialogEditors',
    components: {
        Editors,
    },
    inheritAttrs: false,
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        dialogConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        // 由于使用vue-singleton创建实例而不是传统的render，这里$attrs实际上是无效的
        // 因而不能省略Editors相关props声明
        fields: {
            type: Object,
            required: true,
        },
        editableFields: {
            type: Array,
            required: true,
        },
        fieldLayout: {
            type: [
                Function, Array,
            ],
            required: true,
        },
        effectLayoutFields: {
            type: Array,
            default () {
                return [];
            },
        },
        record: {
            type: Object,
            required: true,
        },
        autoValidate: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: String,
            required: true,
        },
        cancelBtnConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        confirmBtnConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        handleConfirm: {
            type: Function,
            required: true,
        },
    },
    methods: {
        doConfirm () {
            this.$refs.editors.validate()
                .then(this.handleConfirm)
                .catch((err) => {
                    this.$message(err);
                });
        },
    },
};
</script>
