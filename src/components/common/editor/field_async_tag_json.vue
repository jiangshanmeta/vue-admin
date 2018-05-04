<template>
    <field_async_tag
        v-model="model"
        v-bind="$attrs"
    ></field_async_tag>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"field_async_tag_json",
    inheritAttrs:true,
    components:{
        field_async_tag:()=>import("./field_async_tag"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>