<template>
    <EditorEnumAutocomplete
        v-model="model"
        :candidate="filter_candidate"
        :labelfield="labelfield"
        :valuefield="valuefield"
        v-bind="$attrs"
    />
</template>

<script>
import _filter_all_mixin from './_filter_all_mixin';
import _editor_model_mixin from '../Editors/_editor_model_mixin';

export default {
    name: 'FilterEnumAutocomplete',
    components: {
        EditorEnumAutocomplete: () => import('../Editors/EditorEnumAutocomplete'),
    },
    mixins: [
        _filter_all_mixin,
        _editor_model_mixin,
    ],
    inheritAttrs: true,
    props: {
        candidate: {
            type: Array,
            required: true,
        },
    },
};
</script>
