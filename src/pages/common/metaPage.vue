<template>
    <list-view
        v-if="Object.keys(model).length>0"
        v-bind="model"
    />
</template>

<script>
import listView from '@/components/common/listView'

import modelRouterMixin from '@/mixins/router/modelRouterMixin'

export default {
    name: 'MetaPage',
    components: {
        listView,
    },
    mixins: [
        modelRouterMixin,
    ],
}
</script>
