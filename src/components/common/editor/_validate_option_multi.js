import validateOption from "./_validate_option"

export default Object.assign({},validateOption,{
    methods:{
        validateOption(){
            if(!this.isCandidateValid){
                return;
            }

            const allvalueSet = this.allvalueSet;

            let valueSet = new Set();

            for(let item of this.value){
                // 候选项没有该值，按无效处理
                if(!allvalueSet.has(item)){
                    this.handleInvalidValue(this.value,[...allvalueSet]);
                    return;
                }

                // 有重复的，按无效处理
                if(valueSet.has(item)){
                    this.handleInvalidValue(this.value,[...allvalueSet]);
                    return;
                }

                valueSet.add(item);
            }
        },
    },
});