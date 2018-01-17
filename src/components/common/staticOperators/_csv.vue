<template>
    <div>
        <el-button
            @click="handleClick"
            :type="type"
            :size="size"
        >
            {{text}}
        </el-button>
        <input 
            type="file" 
            @change="handleChange" 
            :multiple="false" 
            accept=".csv"
            style="display:none;"
            ref="input"
        >
    </div>
</template>

<script>
import csvjs from 'csv-js'
export default{
    methods:{
        handleClick(){
            this.$refs.input.value = null;
            this.$refs.input.click();
        },
        handleChange(ev){
            var reader = new FileReader();
            reader.onload = function(e){
                this.$emit("importCSV",csvjs.parse(e.target.result) );
            }.bind(this);
            reader.readAsText(ev.target.files[0]);
        },
    },
    props:{
        text:{
            type:String,
            default:"导入csv",
        },
        type:{
            type:String,
            default:"success",
        },
        size:{
            type:String,
            default:""
        }

    }
}
</script>