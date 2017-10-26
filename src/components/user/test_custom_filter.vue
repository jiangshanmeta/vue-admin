<template>
    <span>
        <el-input v-model="model"></el-input>
        {{config.msg}}
    </span>
</template>

<script>
export default{
    name:"test_custom_filter",
    props:{
        value:{

        },
        config:{
            type:Object,
        }
    },
    computed:{
        model:{
            get(){
                return this.value
            },
            set(val){
                this.$emit('input',val)
            }
        }
    }
}
</script>