<template>
    <field_tag
        v-model="model"
        :candidate="candidate"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_tag>
</template>

<script>
import field_tag from "./field_tag.vue"
import async_candidate_mixin from "./async_candidate_mixin.js"
import _model_mixin from "./_model_mixin.js"
import label_value_mixin from "./label_value_mixin.js"

export default {
    name:'field_async_tag',
    components:{
        field_tag,
    },
    mixins:[async_candidate_mixin,_model_mixin,label_value_mixin],
    props:{
        value:{
            type:Array,
            required:true,
        }
    }
}
</script>