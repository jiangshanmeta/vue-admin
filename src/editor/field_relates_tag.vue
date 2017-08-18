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
import field_tag from "./field_tag.vue"
export default{
    mixins:[field_relates_mixin],
    components:{
        field_tag,
    },
    computed:{
        model:{
            get(){
                return this.value;
            },
            set(val){
                this.$emit('input',val);
            }
        }
    },
    props:{
        value:{
            type:Array,
            required:true,
        },
    },
}
</script>