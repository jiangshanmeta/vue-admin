<template>
    <span>{{enums[data]}}</span>
</template>

<script>
export default{
    name:"view_enum",
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