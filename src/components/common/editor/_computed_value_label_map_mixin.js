import merge from 'deepmerge'

import _props_label_value_mixin from "./_props_label_value_mixin"

export default merge.all([_props_label_value_mixin,{
    computed:{
        valueLabelMap(){
            let valuefield = this.valuefield;
            let labelfield = this.labelfield;
            return this.candidate.reduce((map,item)=>{
                return map.set(item[valuefield],item[labelfield]);
            },new Map());
        },
    },
}])