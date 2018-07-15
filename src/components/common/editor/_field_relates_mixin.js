import {logError} from "@/widget/utility"

function noop(){}

export default{
    props:{
        relates:{
            type:Array,
            default:function(){
                return []
            }
        },
        httpRequest:{
            type:Function,
            required:true,
        },
        labelfield:{
            type:String,
            default:'label',
        },
        valuefield:{
            type:String,
            default:'value',
        },
        handleInvalidRelateIds:{
            type:Function,
            default:noop,
        },
        
    },
    methods:{
        getOptions(){
            if(!this.hasValidIds){
                this.handleInvalidRelateIds();
                return;
            }

            if(this.hasCachedOptions){
                return;
            }

            let queryObj = {};
            let cacheObj = {};

            this.relates.forEach((item)=>{
                let queryKey = item.hasOwnProperty("requestField")?item.requestField:item.relateField;
                queryObj[queryKey] = item.value;
                cacheObj[item.relateField] = item.value;
            });

            new Promise((resolve,reject)=>{
                this.httpRequest(resolve,queryObj)
            }).then((candidate)=>{
                this.setCacheOptions(candidate,cacheObj)
            }).catch(logError);

        },
        setCacheOptions(options,cacheObj){
            let start = this.optionsCache;
            let len = this.relates.length;
            let counter = 0;
            while(counter<len-1){
                let cacheKey = cacheObj[this.relates[counter++].relateField];
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
            if(!this.hasValidIds || !this.hasCachedOptions){
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