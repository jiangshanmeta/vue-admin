<template>
    <div>
        <el-input
            v-model="model"
            :placeholder="placeholder"
            style="width:50%;"
        ></el-input>
        {{config.msg}}
    </div>
</template>

<script>

export default{
    name:"username",
    props:{
        value:{
            required:true,

        },
        config:{

        },
        placeholder:{

        }
    },
    computed:{
        model:{
            get(){
                return this.value;
            },
            set(val){
                this.$emit('input',val)
            }
        }
    }
}
</script>