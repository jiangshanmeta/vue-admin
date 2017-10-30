export default {
    data(){
        return {
            field_list:{},
            create_config:{},
        }
    },
    methods:{
        reset_create(){
            this.field_list = {};
            this.create_link = {};
        },
        init_create(model){
            let {field_list={},create_config={}} = model;
            this.field_list = field_list;
            this.create_config = create_config;
        },
    }
}