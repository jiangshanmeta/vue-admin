import validateOption from "./_validate_option"

export default Object.assign({},validateOption,{
    methods:{
        validateOption(){
            if(!this.isCandidateValid){
                return;
            }

            // let allvalueSet = this._gen_allvalue_set();

            let allvalueSet = new Set();
            for(let item of this.candidate){
                allvalueSet.add(item[this.valuefield]);
            }

            if(!allvalueSet.has(this.value)){
                this.handleInvalidValue();
            }


        },
    },
});