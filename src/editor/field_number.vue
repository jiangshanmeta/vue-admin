<template>
    <el-input-number
        v-model="model"
        :controls="false"
    ></el-input-number>
</template>

<script>
import _model_mixin from "./_model_mixin"
export default{
    name:'field_number',
    mixins:[_model_mixin],
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