<template>
    <section>
        <ul class="list-group">
            <li
                v-for="(item,index) in value"
                :key="index"
                class="list-group-item"
            >
                {{ valueLabelMap.has(item)?valueLabelMap.get(item):item }}
                <i
                    class="el-icon-close pull-right"
                    @click="removeItem(index)"
                />
            </li>
        </ul>
        <editor_enum_autocomplete
            :value="selectedId"
            :valuefield="valuefield"
            :labelfield="labelfield"
            :candidate="candidate"
            v-bind="$attrs"
            @input="addItem"
        />
    </section>
</template>

<script>
import _editor_array_mixin from './_editor_array_mixin'
import _props_value_array_mixin from './_props_value_array_mixin'
import _computed_value_label_map_mixin from './_computed_value_label_map_mixin'

export default {
    name: 'EditorArrayAutocomplete',
    components: {
        editor_enum_autocomplete: () => import('./editor_enum_autocomplete'),
    },
    mixins: [
        _editor_array_mixin,
        _props_value_array_mixin,
        _computed_value_label_map_mixin,
    ],
    inheritAttrs: true,
    data () {
        return {
            selectedId: '',
        }
    },
    methods: {
        removeItem (index) {
            const value = JSON.parse(JSON.stringify(this.value))
            value.splice(index, 1)
            this.$emit('input', value)
        },
        addItem (selectedId) {
            this.selectedId = selectedId
            if (!this.value.includes(selectedId)) {
                const value = JSON.parse(JSON.stringify(this.value))
                value.push(selectedId)
                this.$emit('input', value)
            }
        },
    },
}
</script>

<style scoped>
.list-group{
    display:flex;
    flex-direction:column;
    padding-left:0;
    margin-bottom:0;
}
.list-group-item{
    position:relative;
    display:block;
    font-size:14px;
    padding:6px 12px;
    margin-bottom:-1px;
    background-color:#fff;
    border:1px solid rgba(0,0,0,.125);
}
.list-group-item:first-child{
    border-top-left-radius:.25rem;
    border-top-right-radius:.25rem;
}
.list-group-item:last-child{
    margin-bottom:0;
    border-bottom-left-radius:.25rem;
    border-bottom-right-radius:.25rem;
}

.list-group-item .el-icon-close{
    font-size:12px;
    position:relative;
    top:5px;
}
</style>
