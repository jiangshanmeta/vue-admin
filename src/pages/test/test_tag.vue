<template>
    <section>
        <el-input v-model="relates" />
        <table class="table">
            <thead>
                <tr>
                    <th>组件名</th>
                    <th>组件值</th>
                    <th>组件实例</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>editor_array_checkbox</td>
                    <td>{{ editor_array_checkbox }}</td>
                    <td>
                        <editor_array_checkbox
                            v-model="editor_array_checkbox"
                            :candidate="editor_array_checkbox_candidate"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_array_checkbox_json</td>
                    <td>{{ editor_array_checkbox_json }} || {{ typeof editor_array_checkbox_json }}</td>
                    <td>
                        <editor_array_checkbox_json
                            v-model="editor_array_checkbox_json"
                            :candidate="editor_array_checkbox_candidate"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>

                <tr>
                    <td>editor_array_checkbox_async</td>
                    <td>{{ editor_array_checkbox_async }}</td>
                    <td>
                        <editor_array_checkbox_async
                            v-model="editor_array_checkbox_async"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.editor_array_checkbox_async"
                            valuefield="id"
                            labelfield="name"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_array_checkbox_async_json</td>
                    <td>{{ editor_array_checkbox_async_json }} || {{ typeof editor_array_checkbox_async_json }}</td>
                    <td>
                        <editor_array_checkbox_async_json
                            v-model="editor_array_checkbox_async_json"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.editor_array_checkbox_async_json"
                            valuefield="id"
                            labelfield="name"
                        />
                    </td>
                </tr>

                <tr>
                    <td>editor_array_autocomplete</td>
                    <td>{{ editor_array_autocomplete }}</td>
                    <td>
                        <editor_array_autocomplete
                            v-model="editor_array_autocomplete"
                            :candidate="editor_array_autocomplete_candidate"
                            placeholder="placeholder2"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_array_autocomplete_json</td>
                    <td>{{ editor_array_autocomplete_json }}</td>
                    <td>
                        <editor_array_autocomplete_json
                            v-model="editor_array_autocomplete_json"
                            :candidate="editor_array_autocomplete_candidate"
                            placeholder="placeholder2"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>

                <tr>
                    <td>editor_array_autocomplete_async</td>
                    <td>{{ editor_array_autocomplete_async }}</td>
                    <td>
                        <editor_array_autocomplete_async
                            v-model="editor_array_autocomplete_async"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.editor_array_autocomplete_async"
                        />
                    </td>
                </tr>
                <tr>
                    <td>editor_array_autocomplete_async_json</td>
                    <td>{{ editor_array_autocomplete_async_json }} || {{ typeof editor_array_autocomplete_async_json }}</td>
                    <td>
                        <editor_array_autocomplete_async_json
                            v-model="editor_array_autocomplete_async_json"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.editor_array_autocomplete_async_json"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import { unique, clearInvalidData, } from '@/components/common/editor/_validate_option'

const fields = {
    editor_array_checkbox_async: 'editor_array_checkbox_async',
    editor_array_checkbox_async_json: 'editor_array_checkbox_async',
    editor_array_autocomplete_async: 'editor_array_autocomplete_async',
    editor_array_autocomplete_async_json: 'editor_array_autocomplete_async',
}

const editor_array_autocomplete_candidate = [
    { id: 1, name: '太年轻', },
    { id: 2, name: '太天真', },
    { id: 3, name: '亦可赛艇', },
    { id: 4, name: 'exciting', },
    { id: 5, name: 'simple', },
    { id: 6, name: 'naive', },
]

const getCandidate = Object.keys(fields).reduce((obj, field) => {
    obj[field] = function (cb) {
        setTimeout(() => {
            cb(editor_array_autocomplete_candidate)
        }, 2000)
    }
    return obj
}, {})

export default {
    config: {
        editor_array_checkbox_candidate: [
            { value: 1, label: 'aaa', },
            { value: 2, label: 'bbb', },
            { value: 3, label: 'ccc', },
            { value: 4, label: 'ddd', },
            { value: 5, label: 'eee', },
        ],
        editor_array_autocomplete_candidate,
        handleTagInvalid: function (value, allvalue) {
            this.$emit('input', clearInvalidData(value, allvalue))
        },
        handleInvalidRelateIds: function () {
            console.log(this)
        },
        getCandidate,
    },
    components: {
        editor_array_checkbox: () => import('@/components/common/editor/editor_array_checkbox'),
        editor_array_checkbox_json: () => import('@/components/common/editor/editor_array_checkbox_json'),
        editor_array_checkbox_async: () => import('@/components/common/editor/editor_array_checkbox_async'),
        editor_array_checkbox_async_json: () => import('@/components/common/editor/editor_array_checkbox_async_json'),
        editor_array_autocomplete: () => import('@/components/common/editor/editor_array_autocomplete'),
        editor_array_autocomplete_json: () => import('@/components/common/editor/editor_array_autocomplete_json'),
        editor_array_autocomplete_async: () => import('@/components/common/editor/editor_array_autocomplete_async'),
        editor_array_autocomplete_async_json: () => import('@/components/common/editor/editor_array_autocomplete_async_json'),
    },
    data () {
        return {
            relates: '',
            editor_array_checkbox: [
                1, 1, 5, 7,
            ],
            editor_array_checkbox_json: '',
            editor_array_checkbox_async: [
                1, 1, 9,
            ],
            editor_array_checkbox_async_json: '',
            editor_array_autocomplete: [
                2, 2, 8,
            ],
            editor_array_autocomplete_json: '',
            editor_array_autocomplete_async: [
                2, 2, 8,
            ],
            editor_array_autocomplete_async_json: '',
        }
    },
}
</script>
