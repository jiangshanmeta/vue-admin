<template>
    <span v-if="(!hasAsyncComponent) || (hasAsyncComponent && isComponentsLoaded)" 
    class="operator-container">
        <template v-for="item in operators">
            <component
                v-if="item.component"
                :is="item.component"
                :data="data"
                :index="index"
                v-bind="mergeAttrsConfig(item.config)"
                @update="notifyUpdate"
            ></component>
            <el-button
                v-else-if="item.function"
                @click="handleOperatorClick(item.function)"
                size="small"
                :type="item.type"
            >
                {{item.label}}
            </el-button>
        </template>
    </span>
</template>

<script>
import dynamicImportComponent from "@/mixins/common/dynamicImportComponent.js"
export default{
    name:"operators",
    inheritAttrs:true,
    mixins:[dynamicImportComponent],
    props:{
        operators:{
            type:Array,
            required:true,
        },
        data:{
            type:Object,
            required:true,
        },
        index:{
            type:Number,
            required:true,
        },
    },
    data(){
        return {
            isComponentsLoaded:false,
        }
    },
    computed:{
        hasAsyncComponent(){
            return this.operators.some((item)=>{
                return item.component
            })
        },

    },
    methods:{
        mergeAttrsConfig(config){
            if(!config || typeof config !== 'object'){
                return this.$attrs;
            }

            let target = {};
            let attrKeys = Object.keys(this.$attrs);
            attrKeys.forEach((key)=>{
                let descriptor = Object.getOwnPropertyDescriptor(this.$attrs,key);
                Object.defineProperty(target,key,descriptor);
            });

            let configKeys = Object.keys(config);
            configKeys.forEach((key)=>{
                let descriptor = Object.getOwnPropertyDescriptor(config,key);
                Object.defineProperty(target,key,descriptor)
            });

            return target;
        },
        importOperator(){
            if(this.hasAsyncComponent){
                let components = this.operators.reduce((arr,item)=>{
                    if(item.component){
                        arr.push(item.path)
                    }
                    return arr
                },[])
                this.dynamicImportComponent(components).then(()=>{
                    this.isComponentsLoaded = true;
                })
            }
        },
        handleOperatorClick(func){
            func.call(this,this.data,this.index);
            this.notifyUpdate();
        },
        notifyUpdate(){
            this.$emit('update',this.index);
        }
    },
    watch:{
        operators:{
            immediate:true,
            handler:function(){
                this.isComponentsLoaded = false;
                this.importOperator();
            }
        }
    },
}
</script>

<style scoped>
.operator-container{
    white-space: nowrap;
}
</style>
