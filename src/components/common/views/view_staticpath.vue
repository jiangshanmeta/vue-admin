<template>
    <span>{{pathValue}}</span>
</template>

<script>
export default{
    name:"view_staticpath",
    props:{
        path:{
            type:String,
            default:""
        }
    },
    computed:{
        pathValue(){
            let arr = this.path.split(".");
            if(!arr.length){
                return "";
            }

            return arr.reduce((pre,key)=>{
                return pre[key];
            },this)

        }
    },
}
</script>