<template>
    <field_array_model
        v-model="model"
        :labelfield="labelfield"
        :valuefield="valuefield"
        :placeholder="placeholder"
        :candidate="finalOptions"
    ></field_array_model>
</template>

<script>
import field_array_model from "./field_array_model.vue"
import _model_mixin from "./_model_mixin.js"
import field_relates_mixin from "./field_relates_mixin.js"

export default{
    name:'field_relates_array_model',
    mixins:[field_relates_mixin,_model_mixin],
    components:{
        field_array_model,
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