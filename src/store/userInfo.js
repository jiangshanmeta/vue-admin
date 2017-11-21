export default{
    namespaced:true,
    state:{
        name:'',
        privilege:[],
    },
    mutations:{
        resetUserInfo(state){
            state.name = '';
            state.privilege = [];
        },
        initUserInfo(state,data){
            let keys = Object.keys(state);
            keys.forEach((key)=>{
                state[key] = data[key];
            })
        },
    }
}