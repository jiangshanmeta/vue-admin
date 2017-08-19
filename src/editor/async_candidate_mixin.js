export default{
    data(){
        return {
            candidate:[],
        }
    },
    props:{
        uri:{
            type:String,
            required:true,
        }
    },
    methods:{
        getCandidate(){
            this.$axios.get(this.uri).then((json)=>{
                this.candidate = json.data.data;
            })
        },
    },
    created(){
        this.getCandidate();
    }
}