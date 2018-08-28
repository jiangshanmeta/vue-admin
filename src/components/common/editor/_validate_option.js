function noop(){}

export default{
    props:{
        isCandidateValid:{
            type:Boolean,
            default:true,
        },
        handleInvalidValue:{
            type:Function,
            default:noop,
        },
    },
    computed:{
        allvalueSet(){
            return this.candidate.reduce((set,item)=>{
                set.add(item[this.valuefield]);
                return set;
            },new Set());
        },
    },
    created(){
        this.$watch(()=>{
            return {
                value:this.value,
                candidate:this.candidate,
            };
        },this.validateOption,{
            immediate:true,
        });
    },
}

// 去重的方法
export function unique(valueArr){
    return [...new Set(valueArr)];
}

// 清除不在候选项的选择的数据
export function clearInvalidData(valueArr,optionArr){
    let set = new Set(optionArr);
    let resultSet = new Set();
    for(let item of valueArr){
        if(set.has(item)){
            resultSet.add(item);
        }
    }
    return [...resultSet];
}