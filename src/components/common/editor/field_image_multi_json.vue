<template>
    <field_image_multi
        v-model="model"
        v-bind="$attrs"
    ></field_image_multi>
</template>

<script>
import _json_object_mixin from "./_json_object_mixin"

export default{
    name:"field_image_multi_json",
    inheritAttrs:true,
    components:{
        field_image_multi:()=>import("./field_image_multi"),
    },
    mixins:[
        _json_object_mixin,
    ],
}
</script>