import validateOption from "./_validate_option"

export default Object.assign({},validateOption,{
    methods:{
        validateOption(){
            if(!this.isCandidateValid){
                return;
            }

            let allvalueSet = new Set();
            for(let item of this.candidate){
                allvalueSet.add(item[this.valuefield]);
            }

            // 对于单选，只有候选项不含该值的情况
            if(!allvalueSet.has(this.value)){
                this.handleInvalidValue(this.value,[...allvalueSet]);
            }


        },
    },
});