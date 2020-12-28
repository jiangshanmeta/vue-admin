<template>
    <ListView
        v-if="modelLoaded"
        v-bind="model"
    />
</template>

<script>
import ListView from '@/components/common/ListView';

import modelRouterMixin from '@/mixins/router/modelRouterMixin';

export default {
    name: 'MetaList',
    components: {
        ListView,
    },
    mixins: [
        modelRouterMixin,
    ],
};
</script>
