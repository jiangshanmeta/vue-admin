<template>
<section>
    <create
        :field_list="field_list"
        :create_link="create_link"
        :docreate_link="docreate_link"
    ></create>

</section>
</template>

<script>
import create from "@/components/common/create"
export default{
    components:{
        create,
    },
    data(){
        return {
            field_list:{},
            create_link:'',
            docreate_link:'',       
        }

    },
    methods:{
        init(){
            this.field_list = {};
            this.create_link = '';
            this.docreate_link = '';
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            vm.init();
            if(to.meta && to.meta.model){
                import("@/models/" + to.meta.model + ".js").then((rst)=>{
                    // let default = rst.default
                    let {
                        field_list,
                        create_link,
                        docreate_link,
                        } = rst.default;
                    vm.field_list = field_list;
                    vm.create_link = create_link;
                    vm.docreate_link = docreate_link
                })
            }
        })
    }
}

</script>