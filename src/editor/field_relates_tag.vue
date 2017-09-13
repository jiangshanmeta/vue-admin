<template>
    <field_tag
        v-model="model"
        :candidate="finalOptions"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_tag>
</template>

<script>
import field_relates_mixin from "./field_relates_mixin.js"
import model_mixin from "./model_mixin.js"

import field_tag from "./field_tag.vue"
export default{
    name:'field_relates_tag',
    mixins:[field_relates_mixin,model_mixin],
    components:{
        field_tag,
    },
    props:{
        value:{
            type:Array,
            required:true,
        },
    },
}
</script>