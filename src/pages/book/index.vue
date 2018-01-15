<template>
    <list_view
        v-bind="model"
    >
        <div slot="afterCreate" style="display:inline-block;">
            <csv 
                @importCSV="handleImport"
            ></csv>
        </div>
        <template slot="filters" slot-scope="scope">
            <el-button @click="handleClick(scope.formData)">slot 传递</el-button>
        </template>
    </list_view>
</template>

<script>
import csv from "@/components/common/staticOperators/csv"
export default{
    components:{
        csv,
    },
    methods:{
        handleClick(formData){
            console.log(formData)
        },
        handleImport(data){
            console.log(data)
        }
    }
}
</script>