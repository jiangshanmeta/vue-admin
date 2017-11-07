<template>
<section>
    <create
        :field_list="field_list"
        v-bind="createConfig"
    ></create>

    <filters
        :filters="filters"
        @search="handleFilterSearch"
        ref="filters"
    ></filters>

    <list-info
        :field_list="field_list"
        :filters="filters"
        v-bind="listConfig"
        ref="listInfo"
    >
        <template slot-scope="scope">
            <div class="operator-container">
                <operators
                    :field_list="field_list"
                    :operators="operators"
                    :data="scope.data"
                    :index="scope.index"
                    @update="handleOperatorUpdate"
                ></operators>
            </div>
        </template>
    </list-info>
</section>
</template>

<script>
import create from "@/components/common/create.vue"
import create_mixin from "@/mixins/common/create.js"

import filters from "@/editor/filters.vue"
import filters_mixin from "@/mixins/common/filters"

import listInfo from "@/components/common/listInfo.vue"
import listInfo_mixin from "@/mixins/common/listInfo.js"

import operators from "@/components/common/operators.vue"
import operators_mixin from "@/mixins/common/operators.js"



export default{
    components:{
        create,
        filters,
        listInfo,
        operators,
    },
    mixins:[
        create_mixin,
        filters_mixin,
        listInfo_mixin,
        operators_mixin,
    ],
    methods:{
        init(){
            this.reset_create();
            this.reset_filters();
            this.reset_listInfo();
            this.reset_operators();
        },
        handleFilterSearch(){
            this.$refs.listInfo.getListInfo();
        },
        handleOperatorUpdate(){
            this.$refs.listInfo.getListInfo();
        },
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            vm.init();
            if(to.meta && to.meta.model){
                import("@/models/" + to.meta.model + ".js").then((rst)=>{
                    vm.init_create(rst.default);
                    vm.init_filters(rst.default);
                    vm.init_listInfo(rst.default);
                    vm.init_operators(rst.default);
                })
            }
        })
    },
}

</script>

<style scoped>
.operator-container{
    white-space: nowrap;
}
</style>