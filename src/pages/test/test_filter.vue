<template>
    <section>
        <table class="table">
            <thead>
                <th>组件名</th>
                <th>组件值</th>
                <th>组件实例</th>
            </thead>
            <tbody>
                <tr>
                    <td>FilterEnumSelect</td>
                    <td>{{ FilterEnumSelect }}</td>
                    <td>
                        <FilterEnumSelect
                            v-model="FilterEnumSelect"
                            labelfield="name"
                            valuefield="id"
                            allvalue="all"
                            alllabel="不限1"
                            :candidate="FilterEnumSelect_candidate"
                        />
                    </td>
                </tr>
                <tr>
                    <td>FilterEnumAutocomplete</td>
                    <td>{{ FilterEnumAutocomplete }}</td>
                    <td>
                        <FilterEnumAutocomplete
                            v-model="FilterEnumAutocomplete"
                            valuefield="id"
                            labelfield="name"
                            allvalue="all"
                            alllabel="全部"
                            :candidate="FilterEnumAutocomplete_candidate"
                        />
                    </td>
                </tr>
                <tr>
                    <td>FilterEnumAsyncSelect</td>
                    <td>{{ FilterEnumAsyncSelect }}</td>
                    <td>
                        <FilterEnumAsyncSelect
                            v-model="FilterEnumAsyncSelect"
                            :get-candidate="getCandidate.FilterEnumAsyncSelect"
                            :allvalue="-1"
                            alllabel="不限2"
                            labelfield="name"
                            valuefield="id"
                        />
                    </td>
                </tr>
                <tr>
                    <td>FilterEnumAsyncAutocomplete</td>
                    <td>{{ FilterEnumAsyncAutocomplete }}</td>
                    <td>
                        <FilterEnumAsyncAutocomplete
                            v-model="FilterEnumAsyncAutocomplete"
                            :get-candidate="getCandidate.FilterEnumAsyncAutocomplete"
                            :allvalue="-1"
                            alllabel="不限8"
                            labelfield="name"
                            valuefield="id"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import FilterEnumSelect from '@/components/common/Filters/FilterEnumSelect';
import FilterEnumAutocomplete from '@/components/common/Filters/FilterEnumAutocomplete';
import FilterEnumAsyncSelect from '@/components/common/Filters/FilterEnumAsyncSelect';
import FilterEnumAsyncAutocomplete from '@/components/common/Filters/FilterEnumAsyncAutocomplete';

const fields = {
    FilterEnumAsyncSelect: '/test/EditorEnumAsyncSelect',
    FilterEnumAsyncAutocomplete: '/test/EditorEnumAsyncSelect',
};

const FilterEnumAutocomplete_candidate = [
    {
        id: 9,
        name: '张三',
    },
    {
        id: 10,
        name: '张四',
    },
    {
        id: 11,
        name: '李四',
    },
    {
        id: 12,
        name: '李五',
    },
    {
        id: 13,
        name: '王五',
    },
];

const getCandidate = Object.keys(fields).reduce((obj, field) => {
    obj[field] = function (cb) {
        setTimeout(() => {
            cb(FilterEnumAutocomplete_candidate);
        }, 1000);
    };
    return obj;
}, {});

export default {
    config: {
        FilterEnumSelect_candidate: [
            {
                id: 4,
                name: 'value1',
            },
            {
                id: 5,
                name: 'value2',
            },
            {
                id: 6,
                name: 'value3',
            },
        ],
        FilterEnumAutocomplete_candidate,
        getCandidate,
    },
    components: {
        FilterEnumSelect,
        FilterEnumAutocomplete,
        FilterEnumAsyncSelect,
        FilterEnumAsyncAutocomplete,
    },
    data () {
        return {
            FilterEnumSelect: 'all',
            FilterEnumAutocomplete: 'all',
            FilterEnumAsyncSelect: -1,
            FilterEnumAsyncAutocomplete: -1,
        };
    },
};

</script>
