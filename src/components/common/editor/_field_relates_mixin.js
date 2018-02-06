import {getRelatesCandidate} from "@/server/common.js"
import {logError} from "@/widget/utility"
export default{
    props:{
        relates:{
            type:Array,
            default:function(){
                return []
            }
        },
        uri:{
            type:String,
            default:'',
        },
        httpRequest:{
            type:Function,
            default:getRelatesCandidate,
        },
        labelfield:{
            type:String,
            default:'label',
        },
        valuefield:{
            type:String,
            default:'value',
        }
        
    },
    methods:{
        getOptions(){
            if(!this.hasValidIds || this.hasCachedOptions){
                return;
            }

            let query = this.relates.reduce((obj,item)=>{
                let key = item.hasOwnProperty('requestField')?item.requestField : item.relateField;
                obj[key] = item.value;
                return obj;
            },{})

            new Promise((resolve,reject)=>{
                this.isRequest = true;
                this.httpRequest(resolve,query)
            }).then((candidate)=>{
                this.isRequest = false;
                this.setCacheOptions(candidate)
            }).catch(logError);

        },
        setCacheOptions(options){
            let start = this.optionsCache;
            let len = this.relates.length;
            let counter = 0;
            while(counter<len-1){
                let cacheKey = this.relates[counter++]['value'];
                if(!start.hasOwnProperty(cacheKey)){
                    this.$set(start,cacheKey,{});
                }
                start = start[cacheKey];
            }
            this.$set(start,this.relates[len-1]['value'],options);
        },
    },
    computed:{
        finalOptions(){
            if(!this.hasValidIds || !this.hasCachedOptions || this.isRequest){
                return [];
            }
            let length = this.relates.length;
            let counter = 0;
            let start = this.optionsCache;
            while(counter<length){
                start = start[this.relates[counter++]['value'] ];
            }
            return start;
        },
        allOptions(){
            let level = this.relates.length;
            let counter = 0;

            let levelTree = [];
            levelTree[0] = [this.optionsCache];

            while(counter < level){
                levelTree[counter+1] = levelTree[counter].reduce((arr,item)=>{
                    let child = Object.values(item);
                    return arr.concat(child);
                },[]);
                counter++;
            }

            let valuefield = this.valuefield;
            let rst = levelTree[counter].reduce((obj,item)=>{
                item.reduce((obj,item)=>{
                    obj[item[valuefield]] = item
                    return obj;
                },obj)

                return obj
            },{})

            return Object.values(rst);
        },
        hasValidIds(){
            for(let item of this.relates){
                if(item.value === item.invalidValue){
                    return false;
                }
            }
            return true;
        },
        hasCachedOptions(){
            let start = this.optionsCache;
            let len = this.relates.length;
            let counter = 0;
            let relateId;

            while(counter<len){
                relateId = this.relates[counter++]['value'];
                if(!start.hasOwnProperty(relateId)){
                    return false;
                }

                start = start[relateId];
            }
            return true;
        },
    },
    data(){
        return {
            optionsCache:{},
            isRequest:false,
        }
    },
    watch:{
        relates:{
            handler:'getOptions',
            deep:true,
            immediate:true
        },
    },
}