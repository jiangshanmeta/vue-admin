<template>
    <section>
        customername:{{customername}}
        <fieldText
            v-model="model"
        ></fieldText>
    </section>
</template>

<script>
import fieldText from "@/components/common/editor/editor_text"
export default{
    components:{
        fieldText,
    },
    computed:{
        model:{
            get(){
                return this.value;
            },
            set(value){
                this.$emit('input',value);
            },
        },
    },
    props:{
        value:{
            required:true,
        },
        customername:{
            required:true,
        },
    },
}
</script>