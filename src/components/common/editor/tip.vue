<template>
    <div>
        {{showTip}}
    </div>
</template>

<script>
export default{
    props:{
        tip:{
            type:[String,Number,Function],
            required:true,
        },
    },
    computed:{
        showTip(){
            return typeof this.tip === 'function'?this.tip.call(this):this.tip;
        },
    },
}
</script>