<template>
    <div
        v-if="!hasInjectOperatorComponents || componentsInjected"
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
import injectComponents from "@/widget/injectComponents"
import getNeedInjectOperatorComponentsList from "@/injectHelper/injectOperatorComponentsHelper"



import {logError} from "@/widget/utility.js"

export default{
    name:"operators",
    inheritAttrs:true,
    mixins:[
        mergeAttrsConfig,
    ],
    state:{
        needInjectOperatorComponentsList:[],
        get hasInjectOperatorComponents(){
            return this.needInjectOperatorComponentsList.length>0;
        },
    },
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
    data(){
        return {
            componentsInjected:false,
        };
    },
    methods:{
        injectOperatorComponents(){
            if(this.hasInjectOperatorComponents){
                injectComponents(this,this.needInjectOperatorComponentsList).then(()=>{
                    this.componentsInjected = true;
                    this.notifytWidth();
                });

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
    created(){
        this.needInjectOperatorComponentsList = getNeedInjectOperatorComponentsList(this.operators);
        this.injectOperatorComponents();
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
