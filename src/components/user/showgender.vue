<template>
    <span>{{genderCfg[data]}}</span>
</template>

<script>
export default{
    name:"showgender",
    props:{
        data:{
            type:Number,
            required:true
        },
        genderCfg:{
            type:Object,
            required:true
        },
    },
}
</script>