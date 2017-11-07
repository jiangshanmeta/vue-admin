function getDefaultListConfig(){
    return {
        baseUrl:'',
        pageSize:20,
        sortFields:[],
        treatData:undefined
    }
}


export default{
    data(){
        return {
            field_list:{},
            filters:[],
            listConfig:getDefaultListConfig(),
        }
    },
    methods:{
        reset_listInfo(){
            this.field_list = {};
            this.filters = [];
            this.listConfig = getDefaultListConfig();
        },
        init_listInfo(model={}){
            this.field_list = model.field_list || {};
            this.filters = model.filters || [];
            this.listConfig = Object.assign(getDefaultListConfig(),model.listConfig || {});
        }
    },
}