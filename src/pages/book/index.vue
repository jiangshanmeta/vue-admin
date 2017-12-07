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
import list_view from "@/pages/common/list_view.vue"
export default{
    components:{
        list_view,
    },
    methods:{
        handleClick(formData){
            console.log(formData)
        }
    }
}
</script>