<template>
    <list_view
        v-bind="model"
    >
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
    }
}
</script>