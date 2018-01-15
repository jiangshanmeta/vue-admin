<template>
        <csv
            size="small"
            @importCSV="handleImportCSV"
            v-bind="$attrs"
        ></csv>
</template>

<script>
import csv from "@/components/common/staticOperators/csv.vue"
import {logError} from "@/widget/utility.js"

export default{
    name:"operator_csv",
    inheritAttrs:true,
    components:{
        csv
    },
    props:{
        data:{
            type:Object
        },
        handleData:{
            type:Function,
            default:function(){

            },
        },
    },
    methods:{
        handleImportCSV(data){
            let rst = this.handleData(data);
            if(!(rst instanceof Promise)){
                rst = Promise.resolve(rst);
            }
            rst.then(()=>{
                this.$emit('update')
            }).catch(logError)
        },
    }
}
</script>