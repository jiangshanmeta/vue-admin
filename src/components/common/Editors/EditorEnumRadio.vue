<template>
    <el-radio-group
        v-model="model"
        v-bind="$attrs"
    >
        <el-radio
            v-for="item in candidate"
            :key="item[valuefield]"
            :label="item[valuefield]"
        >
            {{ item[labelfield] }}
        </el-radio>
    </el-radio-group>
</template>

<script>
import _editor_enum_mixin from './_editor_enum_mixin';
import _editor_model_mixin from './_editor_model_mixin';

export default {
    name: 'EditorEnumRadio',
    mixins: [
        _editor_enum_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
