<template>
    <field_enum_select
        v-model="model"
        :placeholder="placeholder"
        :candidate="candidate"
        :valuefield="valuefield"
        :labelfield="labelfield"
    >
        <el-option 
            :value="allvalue"
            :label="alllabel"
        ></el-option>
    </field_enum_select>
</template>

<script>
import field_enum_select from "./field_enum_select"

import field_enum_mixin from "./field_enum_mixin.js"
import _label_value_mixin from "./_label_value_mixin.js"
import _model_mixin from "./_model_mixin"
import _filter_all_mixin from "./_filter_all_mixin.js"

export default{
    components:{
        field_enum_select
    },
    mixins:[field_enum_mixin,_label_value_mixin,_model_mixin,_filter_all_mixin],
    props:{
        placeholder:{

        },
    }
}
</script>