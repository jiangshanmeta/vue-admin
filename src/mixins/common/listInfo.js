const config = {
    baseUrl:'',
    pageSize:20,
    sortFields(){
        return [];
    },
    field_list(){
        return {}
    },
    filters(){
        return [];
    },
    treatData:undefined,
}


export default{
    data(){
        return {
            baseUrl:config['baseUrl'],
            pageSize:config['pageSize'],
            sortFields:config['sortFields'](),
            field_list:config['field_list'](),
            filters:config['filters'](),
            treatData:config['treatData'],
        }
    },
    methods:{
        reset_listInfo(){
            [
                'baseUrl',
                'pageSize',
                'sortFields',
                'field_list',
                'filters',
                'treatData',
            ].forEach((item)=>{
                this[item] = typeof config[item] === 'function'? config[item]():config[item]
            });

        },
        init_listInfo(model={}){
            let {
                baseUrl=config['baseUrl'],
                pageSize=config['pageSize'],
                sortFields=config['sortFields'](),
                field_list=config['field_list'](),
                filters=config['filters'](),
                treatData,
            } = model
            this.baseUrl = baseUrl;
            this.pageSize = pageSize;
            this.sortFields = sortFields;
            this.field_list = field_list;
            this.filters = filters;
            this.treatData = treatData;
        }
    },
}