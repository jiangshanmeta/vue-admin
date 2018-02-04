<template>
    <el-button
        :type="typeMap.get(data[field])"
        :size="size"
        @click="handleClick"
    >
        {{textMap.get(data[field])}}
    </el-button>
</template>

<script>
import {logError} from "@/widget/utility.js"
export default{
    name:"toggle",
    props:{
        data:{
            type:Object,
            required:true,
        },
        field:{
            type:String,
            required:true,
        },
        descriptor:{
            type:Array,
            required:true,
        },
        reserveFields:{
            type:Array,
            default:function(){
                return [];
            },
        },
        handleToggle:{
            type:Function,
            default:function(){

            },
        },
        size:{
            type:String,
            default:"small",
        },
    },
    computed:{
        textMap(){
            let map = new Map();
            map.set(this.descriptor[0].value,this.descriptor[1].text);
            map.set(this.descriptor[1].value,this.descriptor[0].text);
            return map;
        },
        typeMap(){
            let map = new Map();
            map.set(this.descriptor[0].value,this.descriptor[1].type);
            map.set(this.descriptor[1].value,this.descriptor[0].type);
            return map;
        },
        valueMap(){
            let map = new Map;
            map.set(this.descriptor[0].value,this.descriptor[1].value);
            map.set(this.descriptor[1].value,this.descriptor[0].value);
            return map;
        }
    },
    methods:{
        handleClick(){
            let data = {};
            data[this.field] = this.valueMap.get(this.data[this.field]);
            this.reserveFields.forEach((field)=>{
                data[field] = this.data[field];
            });
            new Promise((resolve,reject)=>{
                this.handleToggle(resolve,data);
            }).then(()=>{
                this.$emit('update');
            }).catch(logError)
        },
    },
}
</script>