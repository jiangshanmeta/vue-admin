<template>
    <field_enum_select
        v-model="model"
        :candidate="finalOptions"
        :valuefield="valuefield"
        :labelfield="labelfield"
        :placeholder="placeholder"
    >
        <template v-if="$slots.default">
            <slot></slot>
        </template>
    </field_enum_select>
</template>

<script>
import field_relates_mixin from "./field_relates_mixin.js"
import field_enum_select from "./field_enum_select.vue"
import model_mixin from "./model_mixin.js"

export default{
    name:'field_relates_enum_select',
    mixins:[field_relates_mixin,model_mixin],
    components:{
        field_enum_select
    },
    props:{
        value:{
            required:true,
        },
        placeholder:{

        }
    },
}
</script>