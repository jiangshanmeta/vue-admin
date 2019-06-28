<template>
    <EditorEnumSelect
        v-model="model"
        :labelfield="labelfield"
        :valuefield="valuefield"
        :candidate="filter_candidate"
        v-bind="$attrs"
    />
</template>

<script>
import _filter_all_mixin from './_filter_all_mixin';
import _editor_model_mixin from '../Editors/_editor_model_mixin';

export default {
    name: 'FilterEnumSelect',
    components: {
        EditorEnumSelect: () => import('../Editors/EditorEnumSelect'),
    },
    mixins: [
        _filter_all_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
};
</script>
