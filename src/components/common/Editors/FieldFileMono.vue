<template>
    <FieldFileMulti
        v-model="model"
        v-bind="$attrs"
    />
</template>

<script>
import _mono_multi_mixin from './_mono_multi_mixin';

export default {
    name: 'FieldFileMono',
    components: {
        FieldFileMulti: () => import('./FieldFileMulti'),
    },
    mixins: [
        _mono_multi_mixin,
    ],
    inheritAttrs: true,
};
</script>
