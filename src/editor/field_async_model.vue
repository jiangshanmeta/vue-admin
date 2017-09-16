<template>
    <field_model
        v-model="model"
        :candidate="candidate"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :placeholder="placeholder"
    ></field_model>
</template>

<script>
import field_model from "./field_model.vue"
import _label_value_mixin from "./_label_value_mixin.js"
import _model_mixin from "./_model_mixin.js"
import async_candidate_mixin from "./async_candidate_mixin"

export default{
    name:'field_async_model',
    mixins:[_label_value_mixin,_model_mixin,async_candidate_mixin],
    components:{
        field_model
    },
    props:{
        value:{
            required:true,
        },
        placeholder:{

        }
    }
}
</script>