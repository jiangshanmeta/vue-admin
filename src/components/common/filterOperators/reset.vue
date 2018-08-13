<template>
    <el-button
        :type="type"
        :size="size"
        @click="handleClick"
    >
        重置
    </el-button>
</template>

<script>
export default{
    name:"reset",
    props:{
        filters:{
            type:Array,
            required:true,
        },
        data:{
            type:Object,
        },
        type:{
            type:String,
            default:"warning",
        },
        size:{
            type:String,
            default:""
        },
        btnText:{
            type:String,
            default:"重置",
        },
    },
    methods:{
        handleClick(){
            this.filters.forEach((item)=>{
                const defaultConfig = item.editorComponent.default;
                const value = typeof defaultConfig === 'function'?defaultConfig.call(this):defaultConfig;
                this.data[item.field] = value;
            });
        },
    },
}
</script>