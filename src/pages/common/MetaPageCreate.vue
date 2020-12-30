<template>
    <MetaComponentCreate
        v-if="modelLoaded"
        v-bind="model"
    />
</template>

<script>
import {
    createPageMixin,
} from '@/mixins/router/modelRouterMixin';

import MetaComponentCreate from '@/components/common/MetaComponentCreate';

export default {
    name: 'MetaPageCreate',
    components: {
        MetaComponentCreate,
    },
    mixins: [
        createPageMixin,
    ],
};
</script>
