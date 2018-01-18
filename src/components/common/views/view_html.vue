<template>
    <div v-html="data"></div>
</template>

<script>
export default{
    name:"view_html",
    props:{
        data:{
            type:String,
            required:true
        }
    }
}
</script>