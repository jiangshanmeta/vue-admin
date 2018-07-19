export default{
    data(){
        return {
            model:{}
        };
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
}