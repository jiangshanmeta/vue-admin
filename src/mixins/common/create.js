export default {
    data(){
        return {
            field_list:{},
            createConfig:{},
        }
    },
    methods:{
        reset_create(){
            this.field_list = {};
        },
        init_create(model){
            let {field_list={},createConfig={}} = model;
            this.field_list = field_list;
            this.createConfig = createConfig;
        },
    }
}