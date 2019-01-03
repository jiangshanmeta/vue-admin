import merge from 'deepmerge'

import _props_value_mixin from "./_props_value_mixin"
import _props_candidate_mixin from "./_props_candidate_mixin"
import _props_label_value_mixin from "./_props_label_value_mixin"


function noop(){}

// 这个用在editor_enum_ 和 editor_array_ ，有些属性是必用的，但是这个mixin没声明
// TODO

export default merge.all([
    _props_value_mixin,
    _props_candidate_mixin,
    _props_label_value_mixin,{
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
                return set.add(item[this.valuefield]);
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
}])

// 去重的方法
export function unique(valueArr){
    return [...new Set(valueArr)];
}

// 清除不在候选项的选择的数据
export function clearInvalidData(valueArr,optionArr){
    const set = new Set(optionArr);
    const resultSet = new Set();
    for(let item of valueArr){
        if(set.has(item)){
            resultSet.add(item);
        }
    }
    return [...resultSet];
}