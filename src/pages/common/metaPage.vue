<template>
    <list-view
        v-if="Object.keys(model).length>0"
        v-bind="model"
    ></list-view>
</template>

<script>
import listView from "@/components/common/listView"

import modelRouterMixin from "@/mixins/router/modelRouterMixin"

export default{
    name:"metaPage",
    mixins:[
        modelRouterMixin,
    ],
    components:{
        listView,
    },
}
</script>