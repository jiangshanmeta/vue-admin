export default{
    namespaced:true,
    state:{
        controller_name:'',
        method_name:'',
        path:'',
        redirect:'',
    },
    mutations:{
        updateBasicUri(state,payload){
            state.controller_name = payload.controller_name;
            state.method_name = payload.method_name;
            state.path = payload.path;
        },
        setRedirect(state,redirect=''){
            state.redirect = redirect;
        },
    }
}