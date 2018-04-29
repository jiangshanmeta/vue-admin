<template>
    <field_upload
        v-model="model"
        v-bind="$attrs"
    >
        <template slot="default">
            <slot name="default">
                <el-button size="small" type="primary">点击上传</el-button>
            </slot>
        </template>
        <template name="tip">
            <slot name="tip">
                <div slot="tip" class="el-upload__tip">由于底层框架问题一次只能上传一个文件</div>
            </slot>
        </template>
    </field_upload>
</template>

<script>
import field_upload from "./_field_upload"
import _props_value_array_mixin from "./_props_value_array_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"field_file_multi",
    inheritAttrs:true,
    components:{
        field_upload,
    },
    mixins:[
        _props_value_array_mixin,
        _computed_model_mixin,
    ],
}
</script>