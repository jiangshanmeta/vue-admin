export default{
    methods:{
        init_operators(model={}){
            let {operators=[]} = model;
            this.operators = operators;
        },
        reset_operators(){
            this.operators = [];
        }
    },
    data(){
        return {
            operators:[],
        }
    }
}