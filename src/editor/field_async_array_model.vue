<template>
    <field_array_model
        v-model="model"
        :candidate="candidate"
        :labelfield="labelfield"
        :valuefield="valuefield"
        :placeholder="placeholder"
    ></field_array_model>
</template>

<script>
import label_value_mixin from "./label_value_mixin.js"
import async_candidate_mixin from "./async_candidate_mixin.js"
import _model_mixin from "./_model_mixin.js"
import field_array_model from "./field_array_model"

export default {
    name:'field_async_array_model',
    mixins:[label_value_mixin,async_candidate_mixin,_model_mixin],
    components:{
        field_array_model
    },
    props:{
        value:{
            type:Array,
            required:true,
        },
        placeholder:{

        }
    }
}
</script>