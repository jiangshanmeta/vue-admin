<template>
    <el-upload
        list-type="picture-card"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        :file-list="model"
        :action="uri"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :multiple="false"
    >
        <i class="el-icon-plus"></i>
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