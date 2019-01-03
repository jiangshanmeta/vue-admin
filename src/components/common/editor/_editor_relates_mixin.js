import {logError} from "@/widget/utility"

function noop(){}
function alwaysTrue(){
    return true;
}
function identity(value){
    return value;
}

export default{
    props:{
        relates:{
            validator(value){
                return Array.isArray(value) && value[0].propField === 'relateData'
            },
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
                return this.handleInvalidRelateIds();
            }

            if(this.hasCachedOptions){
                return;
            }

            const queryObj = this.relateKeys.reduce((queryObj,field)=>{
                queryObj[field] = this.relateData[field];
                return queryObj;
            },Object.create(null));

            const cacheObj = JSON.parse(JSON.stringify(this.relateData));

            new Promise((resolve)=>{
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
                const field = this.relateKeys[counter++];
                const cacheKey = this.getCacheKey(cacheObj[field],cacheObj);
                if(!start.hasOwnProperty(cacheKey)){
                    this.$set(start,cacheKey,{});
                }
                start = start[cacheKey];
            }
            const field = this.relateKeys[len-1];
            this.$set(start,this.getCacheKey(cacheObj[field],field),options);
        },
    },
    computed:{
        relateKeys(){
            return Object.keys(this.relateData);
        },
        isValidValue(){
            return this.relates[0].isValidValue || alwaysTrue;
        },
        getCacheKey(){
            return this.relates[0].getCacheKey || identity;
        },
        finalOptions(){
            if(!this.hasValidIds || !this.hasCachedOptions){
                return [];
            }

            const length = this.relateKeys.length;
            let counter = 0;
            let start = this.optionsCache;
            while(counter<length){
                const field = this.relateKeys[counter++];
                start = start[this.getCacheKey(this.relateData[field],field)];
            }
            return start;
        },
        hasValidIds(){
            return this.relateKeys.every((field)=>{
                return this.isValidValue(this.relateData[field],field);
            });
        },
        hasCachedOptions(){
            let start = this.optionsCache;
            const len = this.relateKeys.length;

            let counter = 0;
            let relateId;

            while(counter<len){
                let field = this.relateKeys[counter++]
                relateId = this.getCacheKey(this.relateData[field],field);

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