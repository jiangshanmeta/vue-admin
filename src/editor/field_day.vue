<template>
    <field_time
        type="date"
        :placeholder="placeholder"
        v-model="model"
    ></field_time>
</template>

<script>
import _props_placeholder_mixin from "./_props_placeholder_mixin.js"
import _computed_model_mixin from "./_computed_model_mixin.js"
import field_time from "./_field_time.vue"

export default{
    mixins:[
        _props_placeholder_mixin,
        _computed_model_mixin
    ],
    components:{
        field_time
    },
}
</script>