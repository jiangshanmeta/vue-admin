<template>
    <el-dialog
        :visible.sync="visible"
        v-bind="dialogConfig"
    >
        <InfoRender v-bind="infoRenderProp" />
    </el-dialog>
</template>

<script>
import InfoRender from './InfoRender';
import _info_prop_mixin from './_info_prop_mixin';

export default {
    name: 'SingletonDocumentOperatorInfoDialog',
    components: {
        InfoRender,
    },
    mixins: [
        _info_prop_mixin,
    ],
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
    },
};
</script>
