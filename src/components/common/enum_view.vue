<template>
    <span>{{enums[data]}}</span>
</template>

<script>
export default{
    name:"enum_view",
    props:{
        data:{
            type:[Number,String],
            required:true
        },
        enums:{
            type:Object,
            required:true,
        }
    },
}
</script>