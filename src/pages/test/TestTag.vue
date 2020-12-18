<template>
    <section>
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
                            :candidate="EditorArrayCheckboxCandidate"
                            :handle-invalid-value="handleTagInvalid"
                            @change="handleChange"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayJSONCheckbox</td>
                    <td>{{ EditorArrayJSONCheckbox }} || {{ typeof EditorArrayJSONCheckbox }}</td>
                    <td>
                        <EditorArrayJSONCheckbox
                            v-model="EditorArrayJSONCheckbox"
                            :candidate="EditorArrayCheckboxCandidate"
                            :handle-invalid-value="handleTagInvalid"
                            @change="handleChange"
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
                            @change="handleChange"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayJSONAsyncCheckbox</td>
                    <td>{{ EditorArrayJSONAsyncCheckbox }} || {{ typeof EditorArrayJSONAsyncCheckbox }}</td>
                    <td>
                        <EditorArrayJSONAsyncCheckbox
                            v-model="EditorArrayJSONAsyncCheckbox"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.EditorArrayJSONAsyncCheckbox"
                            valuefield="id"
                            labelfield="name"
                            @change="handleChange"
                        />
                    </td>
                </tr>

                <tr>
                    <td>EditorArrayAutocomplete</td>
                    <td>{{ EditorArrayAutocomplete }}</td>
                    <td>
                        <EditorArrayAutocomplete
                            v-model="EditorArrayAutocomplete"
                            :candidate="EditorArrayAutocompleteCandidate"
                            placeholder="placeholder2"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayJSONAutocomplete</td>
                    <td>{{ EditorArrayJSONAutocomplete }}</td>
                    <td>
                        <EditorArrayJSONAutocomplete
                            v-model="EditorArrayJSONAutocomplete"
                            :candidate="EditorArrayAutocompleteCandidate"
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
                    <td>EditorArrayJSONAsyncAutocomplete</td>
                    <td>{{ EditorArrayJSONAsyncAutocomplete }} || {{ typeof EditorArrayJSONAsyncAutocomplete }}</td>
                    <td>
                        <EditorArrayJSONAsyncAutocomplete
                            v-model="EditorArrayJSONAsyncAutocomplete"
                            labelfield="name"
                            valuefield="id"
                            :handle-invalid-value="handleTagInvalid"
                            :get-candidate="getCandidate.EditorArrayJSONAsyncAutocomplete"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import {
    clearInvalidData,
} from '@/components/common/Editors/_validate_option';

const fields = [
    'EditorArrayAsyncCheckbox',
    'EditorArrayJSONAsyncCheckbox',
    'EditorArrayAsyncAutocomplete',
    'EditorArrayJSONAsyncAutocomplete',
];

const EditorArrayAutocompleteCandidate = [
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

const getCandidate = fields.reduce((obj, field) => {
    obj[field] = function () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(EditorArrayAutocompleteCandidate);
            }, 2000);
        });
    };
    return obj;
}, {});

export default {
    config: {
        EditorArrayCheckboxCandidate: [
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
        EditorArrayAutocompleteCandidate,
        handleTagInvalid: function (value, allvalue) {
            this.$emit('input', clearInvalidData(value, allvalue));
        },
        getCandidate,
    },
    components: {
        EditorArrayCheckbox: () => import('@/components/common/Editors/EditorArrayCheckbox'),
        EditorArrayJSONCheckbox: () => import('@/components/common/Editors/EditorArrayJSONCheckbox'),
        EditorArrayAsyncCheckbox: () => import('@/components/common/Editors/EditorArrayAsyncCheckbox'),
        EditorArrayJSONAsyncCheckbox: () => import('@/components/common/Editors/EditorArrayJSONAsyncCheckbox'),

        EditorArrayAutocomplete: () => import('@/components/common/Editors/EditorArrayAutocomplete'),
        EditorArrayJSONAutocomplete: () => import('@/components/common/Editors/EditorArrayJSONAutocomplete'),
        EditorArrayAsyncAutocomplete: () => import('@/components/common/Editors/EditorArrayAsyncAutocomplete'),
        EditorArrayJSONAsyncAutocomplete: () => import('@/components/common/Editors/EditorArrayJSONAsyncAutocomplete'),
    },
    data () {
        return {
            EditorArrayCheckbox: [
                1, 1, 5, 7,
            ],
            EditorArrayJSONCheckbox: '',
            EditorArrayAsyncCheckbox: [
                1, 1, 9,
            ],
            EditorArrayJSONAsyncCheckbox: '',

            EditorArrayAutocomplete: [
                2, 2, 8,
            ],
            EditorArrayJSONAutocomplete: '',
            EditorArrayAsyncAutocomplete: [
                2, 2, 8,
            ],
            EditorArrayJSONAsyncAutocomplete: '',
        };
    },
    methods: {
        handleChange () {
            console.log('change');
        },
    },
};
</script>
