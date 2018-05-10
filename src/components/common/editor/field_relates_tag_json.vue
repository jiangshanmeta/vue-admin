<template>
    <field_relates_tag
        v-model="model"
        v-bind="$attrs"
    ></field_relates_tag>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"
export default{
    name:"field_relates_tag_json",
    inheritAttrs:true,
    components:{
        field_relates_tag:()=>import("./field_relates_tag"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>