<template>
    <el-dialog
        :visible.sync="visible"
        v-bind="dialogConfig"
    >
        <Editors
            ref="editors"
            :fields="fields"
            :editable-fields="editableFields"
            :field-layout="fieldLayout"
            :effect-layout-fields="effectLayoutFields"
            :record="record"
            :auto-validate="autoValidate"
            :mode="mode"
            :record-watch="recordWatch"
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
// 由于使用vue-singleton创建实例而不是传统的render，这里$attrs实际上是无效的
// 因而不能省略Editors相关props声明
import _editor_form_prop_mixin from './_editor_form_prop_mixin';

export default {
    name: 'SingletonDialogEditors',
    components: {
        Editors,
    },
    mixins: [
        _editor_form_prop_mixin,
    ],
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
