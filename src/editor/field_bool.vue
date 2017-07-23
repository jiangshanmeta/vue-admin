<template>
    <field-enum 
        v-model="currentValue" 
        :candidate="candidate"
        :placeholder="placeholder"
    ></field-enum>

</template>

<script>
import {formHelper} from "./mixins"
import fieldEnum from './field_enum'
let boolCandidate = [
                {value:0,label:'否'},
                {value:1,label:'是'},
            ];
export default{
    data (){
        return {
            currentValue:this.value,
            candidate:boolCandidate,
        }
    },
    mixins:[formHelper],
    watch:{

    },
    props:{
        value:{
            type:Number,
            default:0,
        },
        placeholder:{
            default:'',
        }
    },
    components:{
        fieldEnum,
    },
    created(){
        this._asyncProp('currentValue','value');
        this._notifyInput('currentValue');
    }


}
</script>