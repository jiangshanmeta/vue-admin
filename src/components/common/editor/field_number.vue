<template>
    <el-input-number
        v-model="model"
        :controls="false"
        v-bind="$attrs"
        ref="number"
    ></el-input-number>
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator'

import _computed_model_mixin from "./_computed_model_mixin"
import _props_value_number_mixin from "./_props_value_number_mixin"

@Component({
    name:"field_number",
    inheritAttrs:true,
    mixins:[
        _computed_model_mixin,
        _props_value_number_mixin,
    ],
})
export default class field_number extends Vue{

}
</script>