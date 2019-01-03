import merge from 'deepmerge'

import _props_candidate_mixin from "./_props_candidate_mixin"
import _props_label_value_mixin from "./_props_label_value_mixin"

export default merge.all([_props_candidate_mixin,_props_label_value_mixin,{
    props:{
        allvalue:{
            default:"",
        },
        alllabel:{
            type:String,
            default:"不限",
        },
    },
    computed:{
        filter_candidate(){
            const [...arr] = this.candidate;
            arr.unshift({
                [this.labelfield]:this.alllabel,
                [this.valuefield]:this.allvalue,
            })
            return arr;
        }
    }
}])