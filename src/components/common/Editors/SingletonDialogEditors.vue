<template>
    <el-dialog
        :visible.sync="visible"
        v-bind="dialogConfig"
    >
        <Editors
            ref="editors"
            v-bind="editorRenderProp"
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
    data () {
        return {
            visible: false,
        };
    },
    methods: {
        show () {
            this.visible = true;
        },
        hide () {
            this.visible = false;
        },
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
