<template>
    <div v-if="false"><slot></slot></div>
</template>

<script>
export default{
    created(){
        this.updateTitle();
    },
    beforeUpdate(){
        this.updateTitle();
    },
    methods:{
        updateTitle(){
            let slot = this.$slots.default;
            if(typeof slot === 'undefined' || slot.length<1 || typeof slot[0].text !== 'string'){
                return;
            }
            let {text} = slot[0];
            let {title} = document;
            if(text !== title){
                document.title = text;
            }
        }
    },
}
</script>