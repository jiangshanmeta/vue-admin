<template>
    <FieldFileMulti
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _json_object_mixin from './_json_object_mixin';

export default {
    name: 'FieldFileMultiJson',
    components: {
        FieldFileMulti: () => import('./FieldFileMulti'),
    },
    mixins: [
        _json_object_mixin,
    ],
    inheritAttrs: true,
};
</script>
