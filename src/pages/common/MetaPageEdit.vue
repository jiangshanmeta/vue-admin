<template>
    <MetaComponentEdit
        v-if="modelLoaded"
        v-bind="model"
    />
</template>

<script>
import {
    editPageMixin,
} from '@/mixins/router/modelRouterMixin';

import MetaComponentEdit from '@/components/common/MetaComponentEdit';

export default {
    name: 'MetaPageEdit',
    components: {
        MetaComponentEdit,
    },
    mixins: [
        editPageMixin,
    ],
    created () {
        console.log('---');
    },
};
</script>
