<template>
    <div
        v-if="!hasInjectComponent || componentsInjected"
        class="operator-container"
        ref="container"
    >
        <template v-for="item in operators">
            <component
                v-if="item.component"
                :is="item.name"
                :data="data"
                v-bind="mergeAttrsConfig(item.config)"
                @update="notifyUpdate"
            ></component>
            <el-button
                v-else-if="item.handler"
                @click="handleOperatorClick(item.handler)"
                v-bind="item.triggerConfig || {}"
            >
                {{(item.triggerConfig && item.triggerConfig.text) ||  item.label}}
            </el-button>
        </template>
    </div>
</template>

<script>
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import injectComponents from "@/mixins/common/injectComponents"

import {logError} from "@/widget/utility.js"

function hasInjectOperatorComponent(item){
    return item.component;
}

export default{
    name:"operators",
    inheritAttrs:true,
    mixins:[
        mergeAttrsConfig,
        injectComponents,
    ],
    props:{
        operators:{
            type:Array,
            default:function(){
                return [];
            }
        },
        data:{
            type:[Object,Array],
            required:true,
        },
    },
    computed:{
        hasInjectComponent(){
            return this.operators.some(hasInjectOperatorComponent)
        },

    },
    methods:{
        importOperator(){
            if(this.hasInjectComponent){

                const components = this.operators.filter(hasInjectOperatorComponent)

                this.injectComponents(components).then(()=>{
                    this.notifytWidth();
                })
            }else{
                this.notifytWidth();
            }
        },
        handleOperatorClick(func){
            new Promise((resolve,reject)=>{
                func.call(this,resolve,this.data);
            }).then(()=>{
                this.notifyUpdate();
            }).catch(logError)
        },
        notifyUpdate(){
            this.$emit('update');
        },
        notifytWidth(){
            this.$nextTick(()=>{
                this.$emit('setWidth',this.$refs.container.scrollWidth);
            });
        },
    },
    watch:{
        operators:{
            immediate:true,
            handler:function(){
                this.importOperator();
            }
        }
    },
}
</script>

<style scoped>
.operator-container{
    display:table;
    width:max-content;
    white-space:nowrap;
}
.operator-container>*{
    display:inline-block;
    white-space:normal;
}
.operator-container>:first-child~*{
    margin-left:10px;
}
</style>
