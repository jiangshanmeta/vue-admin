<template>
    <el-input 
        type="textarea"
        v-model="model"
        v-bind="$attrs"
    ></el-input>
</template>

<script lang="ts">
import { Vue, Component} from 'vue-property-decorator'

import _computed_model_mixin from "./_computed_model_mixin"

@Component({
    name:"editor_text",
    inheritAttrs:true,
    mixins:[
        _computed_model_mixin,
    ],
})
export default class editor_text extends Vue{

}
</script>