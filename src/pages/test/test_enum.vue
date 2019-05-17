<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <td>组件名</td>
                    <td>组件值</td>
                    <td>组件实例</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>editor_gender</td>
                    <td>{{ editor_gender }}</td>
                    <td>
                        <editor_gender
                            v-model="editor_gender"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_bool</td>
                    <td>{{ editor_bool }}</td>
                    <td>
                        <editor_bool
                            v-model="editor_bool"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_enum_radio</td>
                    <td>{{ editor_enum_radio }}</td>
                    <td>
                        <editor_enum_radio
                            v-model="editor_enum_radio"
                            :candidate="field_enum_candidate"
                            valuefield="valuefield"
                            :handle-invalid-value="handleInvalidValue"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_enum_select</td>
                    <td>{{ editor_enum_select }}</td>
                    <td>
                        <editor_enum_select
                            v-model="editor_enum_select"
                            :candidate="field_enum_candidate"
                            valuefield="valuefield"
                            disabled
                            :handle-invalid-value="handleInvalidValue"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_enum_autocomplete</td>
                    <td>{{ editor_enum_autocomplete }}</td>
                    <td>
                        <editor_enum_autocomplete
                            v-model="editor_enum_autocomplete"
                            :candidate="field_enum_candidate"
                            valuefield="valuefield"
                            placeholder="editor_enum_autocomplete的placeholder"
                            :handle-invalid-value="handleInvalidValue"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_enum_radio_async</td>
                    <td>{{ editor_enum_radio_async }}</td>
                    <td>
                        <editor_enum_radio_async
                            v-model="editor_enum_radio_async"
                            labelfield="label"
                            valuefield="valuefield"
                            :handle-invalid-value="handleInvalidValue"
                            :get-candidate="getCandidate.editor_enum_radio_async"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_enum_select_async</td>
                    <td>{{ editor_enum_select_async }}</td>
                    <td>
                        <editor_enum_select_async
                            v-model="editor_enum_select_async"
                            labelfield="label"
                            valuefield="valuefield"
                            placeholder="the placeholder"
                            :handle-invalid-value="handleInvalidValue"
                            :get-candidate="getCandidate.editor_enum_select_async"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_enum_autocomplete_async</td>
                    <td>{{ editor_enum_autocomplete_async }}</td>
                    <td>
                        <editor_enum_autocomplete_async
                            v-model="editor_enum_autocomplete_async"
                            labelfield="label"
                            valuefield="valuefield"
                            placeholder="placeholder"
                            :handle-invalid-value="handleInvalidValue"
                            :get-candidate="getCandidate.editor_enum_autocomplete_async"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import editor_gender from '@/components/common/editor/editor_gender.vue'
import editor_bool from '@/components/common/editor/editor_bool.vue'

import editor_enum_radio from '@/components/common/editor/editor_enum_radio'
import editor_enum_select from '@/components/common/editor/editor_enum_select'
import editor_enum_autocomplete from '@/components/common/editor/editor_enum_autocomplete'

import editor_enum_radio_async from '@/components/common/editor/editor_enum_radio_async'
import editor_enum_select_async from '@/components/common/editor/editor_enum_select_async'
import editor_enum_autocomplete_async from '@/components/common/editor/editor_enum_autocomplete_async'

const fields = [
    'editor_enum_radio_async',
    'editor_enum_select_async',
    'editor_enum_autocomplete_async',
]

const field_enum_candidate = [
    { valuefield: 1, label: 'eins', },
    { valuefield: 2, label: 'zwei', },
    { valuefield: 3, label: 'drei', },
    { valuefield: 4, label: 'fuer', },
]

const getCandidate = fields.reduce((obj, field) => {
    obj[field] = (cb) => {
        setTimeout(() => {
            cb(field_enum_candidate)
        }, 1000)
    }
    return obj
}, {})

export default {
    components: {
        editor_gender,
        editor_bool,
        editor_enum_radio,
        editor_enum_select,
        editor_enum_autocomplete,
        editor_enum_radio_async,
        editor_enum_select_async,
        editor_enum_autocomplete_async,
    },
    config: {
        field_enum_candidate,
        handleInvalidValue: function (value, options) {
            console.log(value, 'invalid value')
            this.$emit('input', options[Math.floor(Math.random() * options.length)])
        },
        getCandidate,
    },
    data () {
        return {
            editor_gender: 0,
            editor_bool: 0,
            editor_enum_radio: 0,
            editor_enum_select: 0,
            editor_enum_autocomplete: '',
            editor_enum_radio_async: '',
            editor_enum_select_async: '',
            editor_enum_autocomplete_async: 1,

        }
    },
}
</script>
