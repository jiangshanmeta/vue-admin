<template>
    <meta-upload
        v-model="model"
        v-bind="$attrs"
    >
        <template #default>
            <slot name="default">
                <el-button
                    size="small"
                    type="primary"
                >
                    点击上传
                </el-button>
            </slot>
        </template>
        <template #tip>
            <slot name="tip" />
        </template>
    </meta-upload>
</template>

<script>
import metaUpload from './meta-upload';
import _editor_model_mixin from './_editor_model_mixin';
import _props_value_array_mixin from './_props_value_array_mixin';

export default {
    name: 'FieldFileMulti',
    components: {
        metaUpload,
    },
    mixins: [
        _editor_model_mixin,
        _props_value_array_mixin,
    ],
    inheritAttrs: true,
};
</script>
