<template>
    <field_model
        v-model="model"
        :candidate="finalOptions"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :placeholder="placeholder"
    ></field_model>
</template>

<script>
import field_relates_mixin from "./field_relates_mixin.js"
import model_mixin from "./model_mixin.js"
import field_model from "./field_model.vue"
export default{
    name:'field_relates_model',
    mixins:[field_relates_mixin,model_mixin],
    components:{
        field_model
    },
    props:{
        value:{
            required:true,
        },
        placeholder:{

        },
    },
}
</script>