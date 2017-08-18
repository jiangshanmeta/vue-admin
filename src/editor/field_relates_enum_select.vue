<template>
    <field_enum_select
        v-model="model"
        :candidate="finalOptions"
        :valuefield="valuefield"
        :labelfield="labelfield"
    ></field_enum_select>

</template>

<script>
import field_relates_mixin from "./field_relates_mixin.js"
import field_enum_select from "./field_enum_select"
export default{
    mixins:[field_relates_mixin],
    components:{
        field_enum_select
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