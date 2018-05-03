<template>
    <field_tag
        v-model="model"
        v-bind="$attrs"
    ></field_tag>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"field_tag_json",
    inheritAttrs:true,
    components:{
        field_tag:()=>import("./field_tag"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>