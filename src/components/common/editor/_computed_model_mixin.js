import merge from 'deepmerge'

import _props_value_mixin from "./_props_value_mixin"

function identity(value){
    return value;
}

export default merge.all([_props_value_mixin,{
    props:{
        getModelValue:{
            type:Function,
            default:identity,
        },
        setModelValue:{
            type:Function,
            default:identity,
        },
    },
    computed:{
        model:{
            get(){
                return this.getModelValue(this.value);
            },
            set(val){
                this.$emit('input',this.setModelValue(val));
            },
        }
    }
}])