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
    watch:{
        value:{
            handler:"validateOption",
            immediate:true,
        },
        candidate:{
            handler:"validateOption",
            immediate:true,
        },
    },
    methods:{
        _gen_allvalue_set(){
            let allvalueSet = new Set();
            for(let item of this.candidate){
                allvalueSet.add(item[this.valuefield]);
            }
            return allvalueSet;
        },
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