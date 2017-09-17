<template>
<section>
    <create
        :field_list="field_list"
        :create_link="create_link"
        :docreate_link="docreate_link"
    ></create>

    <filters
        :filters="filters"
        @search="handleFilterSearch"
    ></filters>
    <router-link to="/crm/index">user</router-link>

    <router-link to="/book/index">book</router-link>
</section>
</template>

<script>
import create from "@/components/common/create.vue"
import create_mixin from "@/mixins/common/create.js"

import filters from "@/editor/filters.vue"
import filters_mixin from "@/mixins/common/filters"

export default{
    components:{
        create,
        filters,
    },
    mixins:[
        create_mixin,
        filters_mixin,
    ],
    data(){
        return {
    
        }

    },
    methods:{
        init(){
            this.reset_create();
            this.reset_filters();
        },
        handleFilterSearch(params){
            console.log(params);
        }
    },
    beforeRouteEnter(to, from, next){
        console.log(to)
        next((vm)=>{
            vm.init();
            if(to.meta && to.meta.model){
                import("@/models/" + to.meta.model + ".js").then((rst)=>{
                    vm.init_create(rst.default);
                    vm.init_filters(rst.default);
                })
            }
        })
    }
}

</script>