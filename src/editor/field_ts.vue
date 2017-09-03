<template>
    <el-date-picker
        type="datetime"
        :placeholder="placeholder"
        format="yyyy-MM-dd HH:mm:ss"
        v-model="currentValue"
        @change="handleChange"
    ></el-date-picker>
</template>

<script>
export default{
    data(){
        return {
            currentValue:'',
        }        
    },
    props:{
        value:{
            required:true,
        },
        placeholder:{

        }
    },
    methods:{
        handleChange(newVal=''){
            this.$emit('input',newVal)
        }
    },
    watch:{
        value:{
            immediate:true,
            handler(newVal){
                this.currentValue = newVal
            }
        }
    },
}
</script>