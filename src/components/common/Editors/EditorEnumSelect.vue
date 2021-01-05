<template>
    <el-select
        v-model="model"
        v-bind="$attrs"
        v-on="listenersWithoutInput"
    >
        <el-option
            v-for="(item,index) in candidate"
            :key="item[valuefield]"
            :value="item[valuefield]"
            :label="item[labelfield]"
        >
            {{ renderItem(item,index) }}
        </el-option>
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
    props: {
        renderItem: {
            type: Function,
            default (item) {
                return item[this.labelfield];
            },
        },
    },
};
</script>
