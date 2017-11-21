export default{
    namespaced:true,
    state:{
        title:"admin",
    },
    mutations:{
        updateTitie(state,title){
            state.title = title;
        },
    },
}