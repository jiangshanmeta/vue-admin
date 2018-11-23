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
        getCandidate:{
            type:Function,
            required:true,
        },
        handleInvalidRelateIds:{
            type:Function,
            default:noop,
        },
        relateData:{
            type:Object,
            required:true,
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

            const queryObj = this.relateKeys.reduce((queryObj,field)=>{
                const queryKey = this.requestFieldMap.hasOwnProperty(field)?this.requestFieldMap[field]:field;
                queryObj[queryKey] = this.relateData[field];
                return queryObj;
            },Object.create(null));

            const cacheObj = JSON.parse(JSON.stringify(this.relateData));

            new Promise((resolve,reject)=>{
                this.getCandidate(resolve,queryObj)
            }).then((candidate)=>{
                this.setCacheOptions(candidate,cacheObj)
            }).catch(logError);

        },
        setCacheOptions(options,cacheObj){
            let start = this.optionsCache;
            const len = this.relateKeys.length;
            let counter = 0;
            while(counter<len-1){
                let cacheKey = cacheObj[this.relateKeys[counter++]];
                if(!start.hasOwnProperty(cacheKey)){
                    this.$set(start,cacheKey,{});
                }
                start = start[cacheKey];
            }
            this.$set(start,cacheObj[this.relateKeys[len-1]],options);
        },
    },
    computed:{
        relateKeys(){
            return Object.keys(this.relateData);
        },
        requestFieldMap(){
            return this.relates.find((item)=>item.propField==='relateData').requestField || {};
        },
        invalidValueMap(){
            return this.relates.find((item)=>item.propField==='relateData').invalidValue || {};
        },
        finalOptions(){
            if(!this.hasValidIds || !this.hasCachedOptions){
                return [];
            }

            const length = this.relateKeys.length;
            let counter = 0;
            let start = this.optionsCache;
            while(counter<length){
                start = start[this.relateData[this.relateKeys[counter++]]];
            }

            return start;
        },
        hasValidIds(){
            return this.relateKeys.every((field)=>{
                return this.relateData[field] !== this.invalidValueMap[field];
            });
        },
        hasCachedOptions(){
            let start = this.optionsCache;
            const len = this.relateKeys.length;

            let counter = 0;
            let relateId;

            while(counter<len){
                relateId = this.relateData[this.relateKeys[counter++]]

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
        relateData:{
            handler:'getOptions',
            immediate:true
        },
    },
}