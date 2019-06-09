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
                    <td>EditorArrayCheckbox</td>
                    <td>{{ EditorArrayCheckbox }}</td>
                    <td>
                        <EditorArrayCheckbox
                            v-model="EditorArrayCheckbox"
                            :candidate="EditorArrayCheckbox_candidate"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayJsonCheckbox</td>
                    <td>{{ EditorArrayJsonCheckbox }} || {{ typeof EditorArrayJsonCheckbox }}</td>
                    <td>
                        <EditorArrayJsonCheckbox
                            v-model="EditorArrayJsonCheckbox"
                            :candidate="EditorArrayCheckbox_candidate"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>

                <tr>
                    <td>EditorArrayAsyncCheckbox</td>
                    <td>{{ EditorArrayAsyncCheckbox }}</td>
                    <td>
                        <EditorArrayAsyncCheckbox
                            v-model="EditorArrayAsyncCheckbox"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.EditorArrayAsyncCheckbox"
                            valuefield="id"
                            labelfield="name"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayAsyncCheckboxJson</td>
                    <td>{{ EditorArrayAsyncCheckboxJson }} || {{ typeof EditorArrayAsyncCheckboxJson }}</td>
                    <td>
                        <EditorArrayAsyncCheckboxJson
                            v-model="EditorArrayAsyncCheckboxJson"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.EditorArrayAsyncCheckboxJson"
                            valuefield="id"
                            labelfield="name"
                        />
                    </td>
                </tr>

                <tr>
                    <td>EditorArrayAutocomplete</td>
                    <td>{{ EditorArrayAutocomplete }}</td>
                    <td>
                        <EditorArrayAutocomplete
                            v-model="EditorArrayAutocomplete"
                            :candidate="EditorArrayAutocomplete_candidate"
                            placeholder="placeholder2"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayJsonAutocomplete</td>
                    <td>{{ EditorArrayJsonAutocomplete }}</td>
                    <td>
                        <EditorArrayJsonAutocomplete
                            v-model="EditorArrayJsonAutocomplete"
                            :candidate="EditorArrayAutocomplete_candidate"
                            placeholder="placeholder2"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>

                <tr>
                    <td>EditorArrayAsyncAutocomplete</td>
                    <td>{{ EditorArrayAsyncAutocomplete }}</td>
                    <td>
                        <EditorArrayAsyncAutocomplete
                            v-model="EditorArrayAsyncAutocomplete"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.EditorArrayAsyncAutocomplete"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayAsyncAutocompleteJson</td>
                    <td>{{ EditorArrayAsyncAutocompleteJson }} || {{ typeof EditorArrayAsyncAutocompleteJson }}</td>
                    <td>
                        <EditorArrayAsyncAutocompleteJson
                            v-model="EditorArrayAsyncAutocompleteJson"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.EditorArrayAsyncAutocompleteJson"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import {
    unique, clearInvalidData, 
} from '@/components/common/Editors/_validate_option';

const fields = {
    EditorArrayAsyncCheckbox: 'EditorArrayAsyncCheckbox',
    EditorArrayAsyncCheckboxJson: 'EditorArrayAsyncCheckbox',
    EditorArrayAsyncAutocomplete: 'EditorArrayAsyncAutocomplete',
    EditorArrayAsyncAutocompleteJson: 'EditorArrayAsyncAutocomplete',
};

const EditorArrayAutocomplete_candidate = [
    {
        id: 1,
        name: '太年轻', 
    },
    {
        id: 2,
        name: '太天真', 
    },
    {
        id: 3,
        name: '亦可赛艇', 
    },
    {
        id: 4,
        name: 'exciting', 
    },
    {
        id: 5,
        name: 'simple', 
    },
    {
        id: 6,
        name: 'naive', 
    },
];

const getCandidate = Object.keys(fields).reduce((obj, field) => {
    obj[field] = function (cb) {
        setTimeout(() => {
            cb(EditorArrayAutocomplete_candidate);
        }, 2000);
    };
    return obj;
}, {});

export default {
    config: {
        EditorArrayCheckbox_candidate: [
            {
                value: 1,
                label: 'aaa', 
            },
            {
                value: 2,
                label: 'bbb', 
            },
            {
                value: 3,
                label: 'ccc', 
            },
            {
                value: 4,
                label: 'ddd', 
            },
            {
                value: 5,
                label: 'eee', 
            },
        ],
        EditorArrayAutocomplete_candidate,
        handleTagInvalid: function (value, allvalue) {
            this.$emit('input', clearInvalidData(value, allvalue));
        },
        handleInvalidRelateIds: function () {
            console.log(this);
        },
        getCandidate,
    },
    components: {
        EditorArrayCheckbox: () => import('@/components/common/Editors/EditorArrayCheckbox'),
        EditorArrayJsonCheckbox: () => import('@/components/common/Editors/EditorArrayJsonCheckbox'),
        EditorArrayAsyncCheckbox: () => import('@/components/common/Editors/EditorArrayAsyncCheckbox'),
        EditorArrayAsyncCheckboxJson: () => import('@/components/common/Editors/EditorArrayAsyncCheckboxJson'),
        EditorArrayAutocomplete: () => import('@/components/common/Editors/EditorArrayAutocomplete'),
        EditorArrayJsonAutocomplete: () => import('@/components/common/Editors/EditorArrayJsonAutocomplete'),
        EditorArrayAsyncAutocomplete: () => import('@/components/common/Editors/EditorArrayAsyncAutocomplete'),
        EditorArrayAsyncAutocompleteJson: () => import('@/components/common/Editors/EditorArrayAsyncAutocompleteJson'),
    },
    data () {
        return {
            relates: '',
            EditorArrayCheckbox: [
                1, 1, 5, 7,
            ],
            EditorArrayJsonCheckbox: '',
            EditorArrayAsyncCheckbox: [
                1, 1, 9,
            ],
            EditorArrayAsyncCheckboxJson: '',
            EditorArrayAutocomplete: [
                2, 2, 8,
            ],
            EditorArrayJsonAutocomplete: '',
            EditorArrayAsyncAutocomplete: [
                2, 2, 8,
            ],
            EditorArrayAsyncAutocompleteJson: '',
        };
    },
};
</script>
