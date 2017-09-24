<template>
    <span v-if="(!hasAsyncComponent) || (hasAsyncComponent && isComponentsLoaded)" 
    class="operator-container">
        <template v-for="item in operators">
            <component
                v-if="item.component"
                :is="item.component"
                :data="data"
                :index="index"
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
export default{
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
        }
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

                Promise.all(components.map((item)=>{
                    return import("@/"+item)
                })).then((components)=>{
                    components.forEach((component)=>{
                        this.$options.components[component.name] = component;
                    })
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

<style>
.operator-container{
    white-space: nowrap;
}
</style>
