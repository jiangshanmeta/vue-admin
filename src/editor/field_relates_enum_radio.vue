<template>
    <field_enum_radio
        v-model="model"
        :candidate="finalOptions"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_enum_radio>
</template>

<script>
import field_relates_mixin from "./field_relates_mixin.js"
import field_enum_radio from "./field_enum_radio.vue"
import model_mixin from "./model_mixin.js"


export default{
    name:'field_relates_enum_radio',
    mixins:[field_relates_mixin,model_mixin],
    components:{
        field_enum_radio
    },
    props:{
        value:{
            required:true,
        },
    },
}
</script>