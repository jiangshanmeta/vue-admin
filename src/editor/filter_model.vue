<template>
    <field_model
        v-model="model"
        :candidate="filter_candidate"
        :labelfield="labelfield"
        :valuefield="valuefield"
    ></field_model>
</template>

<script>
import field_model from "./field_model.vue"
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _props_label_value_mixin from "./_props_label_value_mixin.js"
import _props_value_mixin from "./_props_value_mixin.js"
import _filter_all_mixin from "./_filter_all_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"

export default{
    components:{
        field_model,
    },
    mixins:[
        _props_placeholder_mixin,
        _props_label_value_mixin,
        _props_value_mixin,
        _filter_all_mixin,
        _computed_model_mixin,
    ],
    computed:{
        filter_candidate(){
            let [...arr] = this.candidate;
            arr.unshift({
                [this.labelfield]:this.alllabel,
                [this.valuefield]:this.allvalue,
            })
            return arr;
        }
    },
    props:{
        candidate:{
            type:Array,
            required:true,
        },
    },
}
</script>