<template>
<section>
    <create
        :field_list="field_list"
        :create_link="create_link"
        :docreate_link="docreate_link"
    ></create>
    <router-link to="/crm/index">user</router-link>

    <router-link to="/book/index">book</router-link>
</section>
</template>

<script>
import create from "@/components/common/create"
import create_mixin from "@/mixins/common/create"


export default{
    components:{
        create,
    },
    mixins:[create_mixin],
    data(){
        return {
            // field_list:{},
            // create_link:'',
            // docreate_link:'',       
        }

    },
    methods:{
        init(){
            this.reset_create();

        }
    },
    beforeRouteEnter(to, from, next){
        console.log(to)
        next((vm)=>{
            vm.init();
            if(to.meta && to.meta.model){
                import("@/models/" + to.meta.model + ".js").then((rst)=>{
                    vm.init_create(rst.default);

                })
            }
        })
    }
}

</script>