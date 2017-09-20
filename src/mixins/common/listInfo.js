export default{
    data(){
        return {
            baseUrl:'',
            pageSize:20,
            sortFields:[],
            field_list:{},
            filters:[],
            treatData:undefined,
        }
    },
    methods:{
        reset_listInfo(){
            this.baseUrl = '';
            this.pageSize = 20;
            this.sortFields = [];
            this.field_list = {};
            this.filters = [];
            this.treatData = undefined;
        },
        init_listInfo(model){
            let {
                baseUrl='',
                pageSize=20,
                sortFields=[],
                field_list={},
                filters=[],
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