import {logError} from "@/widget/utility"
export default{
    data(){
        return {
            candidate:[],
            isRequest:false,
        }
    },
    props:{
        httpRequest:{
            type:Function,
            required:true,
        }
    },
    methods:{
        getCandidate(){
            return new Promise((resolve,reject)=>{
                this.isRequest = true;
                this.httpRequest(resolve);
            }).then((candidate)=>{
                this.isRequest = false;
                return this.candidate = candidate
            }).catch(logError);
        },
    },
    created(){
        this.getCandidate();
    }
}