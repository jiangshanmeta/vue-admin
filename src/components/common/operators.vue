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
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
export default{
    name:"operators",
    inheritAttrs:true,
    mixins:[
        dynamicImportComponent,
        mergeAttrsConfig,
    ],
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
