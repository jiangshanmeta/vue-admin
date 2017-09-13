export default {
    data(){
        return {
            field_list:{},
            create_link:'',
            docreate_link:'',
        }
    },
    methods:{
        reset_create(){
            this.field_list = {};
            this.create_link = '';
            this.docreate_link = '';
        },
        init_create(model){
            let {field_list={},create_link='',docreate_link=''} = model;
            this.field_list = field_list;
            this.create_link = create_link;
            this.docreate_link = docreate_link;
        },
    }
}