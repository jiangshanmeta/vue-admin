<template>
    <el-date-picker
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="currentValue"
        @change="handleChange"
    ></el-date-picker>
</template>

<script>
import _props_disabled_mixin from "./_props_disabled_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"

const formatOptions = ['timestamp','string','object','custom'];

function identity(value){
    return value;
}

export default{
    data(){
        return {
            currentValue:'',
        }
    },
    mixins:[
        _props_disabled_mixin,
        _props_value_mixin,
        _props_placeholder_mixin,
    ],
    props:{
        type:{
            type:String,
            required:true,
        },
        format:{
            type:String,
            default:"string",
            validator(value){
                return formatOptions.includes(value);
            }
        },
        formatMethod:{
            type:Function,
            default:identity,
        },
        parseDateFromValue:{
            type:Function,
            default(date){
                return new Date(date);
            },
        },
    },
    methods:{
        handleChange(newVal=''){
            switch(this.format){
                case 'timestamp':
                    newVal = new Date(newVal).getTime();
                    break;
                case 'string':
                    break;
                case 'object':
                    newVal = new Date(newVal);
                    break;
                case 'custom':
                    newVal = this.formatMethod(newVal);
                    break;
            }

            this.$emit('input',newVal)
        },
    },
    watch:{
        value:{
            immediate:true,
            handler(newVal){
                this.currentValue = this.parseDateFromValue(newVal)
            }
        }
    },
}
</script>