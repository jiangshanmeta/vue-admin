export default{
    data(){
        return {
            field_list:{},
            edit_link:'',
            doedit_link:'',
        }
    },
    methods:{
        reset_edit(){
            this.field_list = {};
            this.edit_link = '';
            this.doedit_link = '';
        },
        init_edit(model={}){
            let {field_list={},edit_link='',doedit_link=''} = model;
            this.field_list = field_list;
            this.edit_link = edit_link;
            this.doedit_link = doedit_link;
        },
    }
}