<template>
    <el-input-number
        v-model="model"
        :controls="false"
    ></el-input-number>
</template>

<script>
import model_mixin from "./model_mixin"
export default{
    mixins:[model_mixin],
    props:{
        value:{
            type:Number,
            required:true,
        },
        placeholder:{

        }
    },
}
</script>