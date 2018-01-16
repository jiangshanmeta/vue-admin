<template>
    <basic_csv
        @importCSV="handleImport"
        v-bind="$attrs"
    ></basic_csv>
</template>

<script>
import basic_csv from "./_csv.vue"
import {logError} from "@/widget/utility.js"
export default {
    name:"csv",
    inheritAttrs:true,
    components:{
        basic_csv,
    },
    props:{
        handleData:{
            type:Function,
            default:function(){

            }
        },
    },
    methods:{
        handleImport(data){
            new Promise((resolve,reject)=>{
                this.handleData(resolve,data);
            }).then(()=>{
                this.$emit('update');
            }).catch(logError)
        },
    }
}
</script>