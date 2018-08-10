<template>
    <span>
        {{label}}
        <span style="color:red;">*</span>
    </span>
</template>

<script>
export default{
    props:{
        label:{
            type:String,
            required:true,
        },
    },
}
</script>