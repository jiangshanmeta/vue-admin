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
                    <td>EditorBool</td>
                    <td>{{ EditorBool }}</td>
                    <td>
                        <EditorBool
                            v-model="EditorBool"
                            @blur="handleBlur"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorEnumRadio</td>
                    <td>{{ EditorEnumRadio }}</td>
                    <td>
                        <EditorEnumRadio
                            v-model="EditorEnumRadio"
                            :candidate="field_enum_candidate"
                            valuefield="valuefield"
                            :handle-invalid-value="handleInvalidValue"
                            @change="handleChange"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorEnumSelect</td>
                    <td>{{ EditorEnumSelect }}</td>
                    <td>
                        <EditorEnumSelect
                            v-model="EditorEnumSelect"
                            :candidate="field_enum_candidate"
                            valuefield="valuefield"
                            :handle-invalid-value="handleInvalidValue"
                            @blur="handleBlur"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorEnumAutocomplete</td>
                    <td>{{ EditorEnumAutocomplete }}</td>
                    <td>
                        <EditorEnumAutocomplete
                            v-model="EditorEnumAutocomplete"
                            :candidate="field_enum_candidate"
                            valuefield="valuefield"
                            placeholder="EditorEnumAutocomplete的placeholder"
                            :handle-invalid-value="handleInvalidValue"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorEnumAsyncRadio</td>
                    <td>{{ EditorEnumAsyncRadio }}</td>
                    <td>
                        <EditorEnumAsyncRadio
                            v-model="EditorEnumAsyncRadio"
                            labelfield="label"
                            valuefield="valuefield"
                            :handle-invalid-value="handleInvalidValue"
                            :get-candidate="getCandidate.EditorEnumAsyncRadio"
                            @change="handleChange"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorEnumAsyncSelect</td>
                    <td>{{ EditorEnumAsyncSelect }}</td>
                    <td>
                        <EditorEnumAsyncSelect
                            v-model="EditorEnumAsyncSelect"
                            labelfield="label"
                            valuefield="valuefield"
                            placeholder="the placeholder"
                            :handle-invalid-value="handleInvalidValue"
                            :get-candidate="getCandidate.EditorEnumAsyncSelect"
                            @blur="handleBlur"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorEnumAsyncAutocomplete</td>
                    <td>{{ EditorEnumAsyncAutocomplete }}</td>
                    <td>
                        <EditorEnumAsyncAutocomplete
                            v-model="EditorEnumAsyncAutocomplete"
                            labelfield="label"
                            valuefield="valuefield"
                            placeholder="placeholder"
                            :handle-invalid-value="handleInvalidValue"
                            :get-candidate="getCandidate.EditorEnumAsyncAutocomplete"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorEnumRemoteAutocomplete</td>
                    <td>{{ EditorEnumRemoteAutocomplete }}</td>
                    <td>
                        <EditorEnumRemoteAutocomplete
                            v-model="EditorEnumRemoteAutocomplete"
                            labelfield="label"
                            valuefield="valuefield"
                            :get-label-by-value="getLabelByValue"
                            :fetch-suggestions="fetchSuggestions"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import EditorBool from '@/components/common/Editors/EditorBool';

import EditorEnumRadio from '@/components/common/Editors/EditorEnumRadio';
import EditorEnumSelect from '@/components/common/Editors/EditorEnumSelect';
import EditorEnumAutocomplete from '@/components/common/Editors/EditorEnumAutocomplete';

import EditorEnumAsyncRadio from '@/components/common/Editors/EditorEnumAsyncRadio';
import EditorEnumAsyncSelect from '@/components/common/Editors/EditorEnumAsyncSelect';
import EditorEnumAsyncAutocomplete from '@/components/common/Editors/EditorEnumAsyncAutocomplete';

import EditorEnumRemoteAutocomplete from '@/components/common/Editors/EditorEnumRemoteAutocomplete';

const fields = [
    'EditorEnumAsyncRadio',
    'EditorEnumAsyncSelect',
    'EditorEnumAsyncAutocomplete',
];

const field_enum_candidate = [
    {
        valuefield: 1,
        label: 'one',
    },
    {
        valuefield: 2,
        label: 'two',
    },
    {
        valuefield: 3,
        label: 'three',
    },
    {
        valuefield: 4,
        label: 'four',
    },
];

const getCandidate = fields.reduce((obj, field) => {
    obj[field] = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(field_enum_candidate);
            }, 1000);
        });
    };
    return obj;
}, {});

export default {
    components: {
        EditorBool,
        EditorEnumRadio,
        EditorEnumSelect,
        EditorEnumAutocomplete,
        EditorEnumAsyncRadio,
        EditorEnumAsyncSelect,
        EditorEnumAsyncAutocomplete,
        EditorEnumRemoteAutocomplete,
    },
    config: {
        field_enum_candidate,
        handleInvalidValue: function (value, options) {
            console.log(value, 'invalid value');
            this.$emit('input', options[Math.floor(Math.random() * options.length)]);
        },
        getCandidate,
    },
    data () {
        return {
            EditorBool: 0,
            EditorEnumRadio: 0,
            EditorEnumSelect: 0,
            EditorEnumAutocomplete: '',
            EditorEnumAsyncRadio: '',
            EditorEnumAsyncSelect: '',
            EditorEnumAsyncAutocomplete: 1,
            EditorEnumRemoteAutocomplete: 666,
        };
    },
    methods: {
        handleBlur () {
            console.log('blur');
        },
        handleChange () {
            console.log('change');
        },
        getLabelByValue (cb, value) {
            console.log(value);
            cb('sixsixsix');
        },
        fetchSuggestions (cb, queryString) {
            setTimeout(() => {
                cb(field_enum_candidate);
            }, 1000);
        },
    },
};
</script>
