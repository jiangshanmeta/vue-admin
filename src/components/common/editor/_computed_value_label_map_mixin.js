import merge from 'deepmerge'

import _props_label_value_mixin from "./_props_label_value_mixin"

export default merge.all([_props_label_value_mixin,{
    computed:{
        valueLabelMap(){
            const {
                valuefield,
                labelfield,
            } = this;
            return this.candidate.reduce((map,item)=>{
                return map.set(item[valuefield],item[labelfield]);
            },new Map());
        },
    },
}])