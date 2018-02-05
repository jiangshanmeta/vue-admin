<template>
    <field_number
        v-model="model"
        v-bind="$attrs"
        ref="field_number"
    ></field_number>
</template>

<script>
import _props_value_number_mixin from "./_props_value_number_mixin.js"
import field_number from "./field_number.vue"
export default{
    name:"field_int",
    inheritAttrs:true,
    mixins:[
        _props_value_number_mixin,
    ],
    components:{
        field_number,
    },
    computed:{
        model:{
            get(){
                return this.value;
            },
            set(val){
                let intVal = Number.parseInt(val);

                if(intVal !== val){
                    this.$nextTick(()=>{
                        const inputNumber = this.$refs.field_number.$refs.number;
                        // 如果不修改input-number的currentValu值
                        // input-number的值为非法值
                        // 由于input组件监听了input-number组件的value
                        // 会被重写为非法值
                        inputNumber.setCurrentValue(intVal);
                        inputNumber.$refs.input.setCurrentValue(intVal);
                    })

                }else{
                    this.$emit('input',intVal);
                }
                
            }
        }
    },
}
</script>