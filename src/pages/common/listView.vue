<template>
    <list_view
        v-if="Object.keys(model).length"
        v-bind="model"
    ></list_view>
</template>

<script>
import list_view from "@/components/common/list_view"

import modelRouterMixin from "@/mixins/router/modelRouterMixin"

export default{
    name:"listView",
    mixins:[
        modelRouterMixin,
    ],
    components:{
        list_view,
    },
}
</script>