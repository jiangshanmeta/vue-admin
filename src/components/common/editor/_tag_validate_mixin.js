export default{
    props:{
        validCandidate:{
            type:Boolean,
            default:true,
        },
    },
    watch:{
        value:{
            handler:"validateTag",
            immediate:true,
        },
        candidate:{
            handler:"validateTag",
            immediate:true,
        },
    },
    methods:{
        validateTag(){
            if(!this.validCandidate){
                return;
            }
            let allValueSet = new Set();
            for(let item of this.candidate){
                allValueSet.add(item[this.valuefield]);
            }

            let valueSet = new Set();

            let len = this.value.length;

            let value;
            while(len--){
                value = this.value[len];
                // 不合法值
                if(!allValueSet.has(value)){
                    this.value.splice(len,1);
                    continue;
                }

                // 重复的值
                if(valueSet.has(value)){
                    this.value.splice(len,1);
                    continue;
                }

                valueSet.add(value);

            }


        },
    },
}