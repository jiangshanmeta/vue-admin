<template>
    <ListView
        v-if="modelLoaded"
        v-bind="model"
    />
</template>

<script>
import ListView from '@/components/common/ListView';

import {
    listPageMixin,
} from '@/mixins/router/modelRouterMixin';

export default {
    name: 'MetaPageList',
    components: {
        ListView,
    },
    mixins: [
        listPageMixin,
    ],
};
</script>
