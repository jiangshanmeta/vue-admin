<template>
<div style="display:inline-block">
    <span v-for="item in operators" @click="doOperate(item.link)">
        {{item.label}}
        <i :class="item.icon"></i>
    </span>
</div>
</template>

<script>

export default{
    props:{
        id:{
            type:String,
            required:true,
        },
        operators:{
            type:Array,
            required:true,
        },
    },
    methods:{
        doOperate(uri){
            if(!confirm('确认一下？')){
                return;
            }
            this.$axios.post(uri+this.id).then((json)=>{
                this.$emit('update',json.data);
            })
        }
    }
}
</script>

