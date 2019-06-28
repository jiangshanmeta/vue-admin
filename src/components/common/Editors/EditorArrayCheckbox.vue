<template>
    <el-checkbox-group
        v-model="model"
        v-bind="$attrs"
    >
        <el-checkbox
            v-for="item in candidate"
            :key="item[valuefield]"
            :label="item[valuefield]"
        >
            {{ item[labelfield] }}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script>
import _editor_array_mixin from './_editor_array_mixin';
import _editor_model_mixin from './_editor_model_mixin';
import _props_value_array_mixin from './_props_value_array_mixin';

export default {
    name: 'EditorArrayCheckbox',
    mixins: [
        _editor_array_mixin,
        _editor_model_mixin,
        _props_value_array_mixin,
    ],
};
</script>
