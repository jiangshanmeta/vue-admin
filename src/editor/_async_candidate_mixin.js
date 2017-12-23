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
            }).catch((e)=>{
                console.log(e)
            })
        },
    },
    created(){
        this.getCandidate();
    }
}