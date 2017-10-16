<template>
    <span>{{config[data]}}</span>
</template>

<script>
export default{
    name:"showgender",
    props:{
        data:{
            type:Number,
            required:true
        },
        config:{
            type:Object,
            required:true,
        }
    },
}
</script>