<template>
    <el-select
        v-model="model"
        v-bind="$attrs"
    >
        <el-option
            v-for="item in candidate"
            :key="item[valuefield]"
            :value="item[valuefield]"
            :label="item[labelfield]"
        />
    </el-select>
</template>

<script>
import _editor_enum_mixin from './_editor_enum_mixin';
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorEnumSelect',
    mixins: [
        _editor_enum_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
