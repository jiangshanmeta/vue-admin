<template>
    <span>
        <el-input v-model="model"></el-input>
        {{msg}}
    </span>
</template>

<script>
export default{
    name:"test_custom_filter",
    props:{
        value:{

        },
        msg:{

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