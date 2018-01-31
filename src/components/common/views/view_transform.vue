<template>
    <span>{{transform(data)}}</span>
</template>

<script>
export default{
    name:"view_transform",
    props:{
        data:{
            required:true,
        },
        transform:{
            type:Function,
            default:function(data){
                return data;
            },
        }
    },
}
</script>