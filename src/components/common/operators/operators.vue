<template>
    <div 
        v-if="(!hasAsyncComponent) || $asyncComponent.$all" 
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
                v-else-if="item.function"
                @click="handleOperatorClick(item.function)"
                :size="size"
                :type="item.type"
            >
                {{item.label}}
            </el-button>
        </template>
    </div>
</template>

<script>
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import {logError} from "@/widget/utility.js"

export default{
    name:"operators",
    inheritAttrs:true,
    mixins:[
        mergeAttrsConfig,
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
        size:{
            type:String,
            default:"small"
        }
    },
    data(){
        return {

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
                        arr.push({
                            name:item.name,
                            component:item.component,
                        })
                    }
                    return arr
                },[])

                this.$resetAsyncComponent(components).then(()=>{
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
