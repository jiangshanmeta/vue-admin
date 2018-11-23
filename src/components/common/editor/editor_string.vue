<template>
    <el-input 
        v-model="model"
        v-bind="$attrs"
        type="input"
    ></el-input>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import _computed_model_mixin from "./_computed_model_mixin"

@Component({
    name:"editor_string",
    inheritAttrs:true,
    mixins:[
        _computed_model_mixin,
    ],
})
export default class editor_string extends Vue{
    
}
</script>