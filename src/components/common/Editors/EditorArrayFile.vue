<template>
    <Upload
        v-model="model"
        v-bind="$attrs"
    >
        <el-button>上传</el-button>
    </Upload>
</template>

<script>
import _editor_model_mixin from './_editor_model_mixin';
import _props_value_array_mixin from './_props_value_array_mixin';

export default {
    name: 'EditorArrayFile',
    components: {
        Upload: () => import('./Upload'),
    },
    mixins: [
        _editor_model_mixin,
        _props_value_array_mixin,
    ],
};

</script>
