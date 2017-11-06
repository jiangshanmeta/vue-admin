import {getAsyncCandidate} from "@/server/common.js"
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
        },
        httpRequest:{
            type:Function,
            default:getAsyncCandidate
        }
    },
    methods:{
        getCandidate(){
            return new Promise((resolve,reject)=>{
                this.httpRequest(this,resolve)
            }).then((candidate)=>{
                return this.candidate = candidate
            }).catch(()=>{

            })
        },
    },
    created(){
        this.getCandidate();
    }
}