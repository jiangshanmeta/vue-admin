export default{
    data(){
        return {
            filters:[]
        }
    },
    methods:{
        reset_filters(){
            this.filters = [];
        },
        init_filters(model){
            let {filters=[]} = model;
            this.filters = filters;
        },
    }
}