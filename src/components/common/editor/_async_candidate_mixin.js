import {getAsyncCandidate} from "@/server/common.js"
import {logError} from "@/widget/utility"
export default{
    data(){
        return {
            candidate:[],
            isRequest:false,
        }
    },
    props:{
        uri:{
            type:String,
        },
        httpRequest:{
            type:Function,
            default:getAsyncCandidate
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