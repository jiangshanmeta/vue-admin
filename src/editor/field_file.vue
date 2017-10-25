<template>
    <el-upload
        :file-list="model"
        :action="uri"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :multiple="false"
    >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">由于底层框架问题一次只能上传一个文件</div>
    </el-upload>
</template>

<script>
import _props_value_array_mixin from "./_props_value_array_mixin.js"
import _upload_mixin from "./_upload_mixin.js"
export default{
    mixins:[
        _props_value_array_mixin,
        _upload_mixin,
    ],
}
</script>