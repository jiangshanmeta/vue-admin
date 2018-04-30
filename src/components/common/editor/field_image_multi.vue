<template>
    <field_file_multi
        v-model="model"
        list-type="picture-card"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        v-bind="$attrs"
    >
        <template slot="default">
            <slot name="default"></slot>
        </template>

        <template slot="tip">
            <slot name="tip"></slot>
        </template>
    </field_file_multi>
</template>

<script>
import field_file_multi from "./field_file_multi"
import _props_value_array_mixin from "./_props_value_array_mixin"
import _computed_model_mixin from "./_computed_model_mixin"

export default{
    name:"field_image_multi",
    inheritAttrs:true,
    components:{
        field_file_multi,
    },
    mixins:[
        _props_value_array_mixin,
        _computed_model_mixin,
    ],
}

</script>