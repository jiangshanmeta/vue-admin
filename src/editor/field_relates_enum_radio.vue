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
export default{
    mixins:[field_relates_mixin],
    components:{
        field_enum_radio
    },
    computed:{
        model:{
            get(){
                return this.value;
            },
            set(val){
                this.$emit('input',val);
            }
        },
    },
    props:{
        value:{
            required:true,
        },
    },
}
</script>