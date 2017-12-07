import list_view from "@/pages/common/list_view"
import Vue from "vue"

export default Vue.extend({
    components:{
        list_view
    },
    data(){
        return {
            model:{},
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            vm.model = {};
            if(to.meta && to.meta.model){
                import("@/models/" + to.meta.model + ".js").then((rst)=>{
                    vm.model = rst.default || {};
                })
            }
        })
    },
    render(h){
        return h('list_view',{
            props:this.model
        })
    }
})