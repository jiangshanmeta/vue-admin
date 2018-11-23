import merge from 'deepmerge'

import _props_value_mixin from "./_props_value_mixin"

export default merge.all([_props_value_mixin,{
    computed:{
        model:{
            get(){
                return this.value;
            },
            set(val){
                this.$emit('input',val);
            },
        }
    }
}])