<template>
    <editor_number
        v-model="model"
        v-bind="$attrs"
        ref="editor_number"
    ></editor_number>
</template>

<script>
import _props_value_number_mixin from "./_props_value_number_mixin"
import editor_number from "./editor_number"
export default{
    name:"editor_int",
    inheritAttrs:true,
    mixins:[
        _props_value_number_mixin,
    ],
    components:{
        editor_number,
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
                        const inputNumber = this.$refs.editor_number.$refs.number;
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