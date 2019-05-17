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
                    <td>filter_enum_select</td>
                    <td>{{ filter_enum_select }}</td>
                    <td>
                        <filter_enum_select
                            v-model="filter_enum_select"
                            labelfield="name"
                            valuefield="id"
                            allvalue="all"
                            alllabel="不限1"
                            :candidate="filter_enum_select_candidate"
                        />
                    </td>
                </tr>
                <tr>
                    <td>filter_enum_autocomplete</td>
                    <td>{{ filter_enum_autocomplete }}</td>
                    <td>
                        <filter_enum_autocomplete
                            v-model="filter_enum_autocomplete"
                            valuefield="id"
                            labelfield="name"
                            allvalue="all"
                            alllabel="全部"
                            :candidate="filter_enum_autocomplete_candidate"
                        />
                    </td>
                </tr>
                <tr>
                    <td>filter_enum_select_async</td>
                    <td>{{ filter_enum_select_async }}</td>
                    <td>
                        <filter_enum_select_async
                            v-model="filter_enum_select_async"
                            :get-candidate="getCandidate.filter_enum_select_async"
                            :allvalue="-1"
                            alllabel="不限2"
                            labelfield="name"
                            valuefield="id"
                        />
                    </td>
                </tr>
                <tr>
                    <td>filter_enum_autocomplete_async</td>
                    <td>{{ filter_enum_autocomplete_async }}</td>
                    <td>
                        <filter_enum_autocomplete_async
                            v-model="filter_enum_autocomplete_async"
                            :get-candidate="getCandidate.filter_enum_autocomplete_async"
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
import filter_enum_select from '@/components/common/editor/filter_enum_select'
import filter_enum_autocomplete from '@/components/common/editor/filter_enum_autocomplete'
import filter_enum_select_async from '@/components/common/editor/filter_enum_select_async'
import filter_enum_autocomplete_async from '@/components/common/editor/filter_enum_autocomplete_async'

import axios from '@/server/axios'

const fields = {
    filter_enum_select_async: '/test/editor_enum_select_async',
    filter_enum_autocomplete_async: '/test/editor_enum_select_async',
}

const filter_enum_autocomplete_candidate = [
    { id: 9, name: '张三', },
    { id: 10, name: '张四', },
    { id: 11, name: '李四', },
    { id: 12, name: '李五', },
    { id: 13, name: '王五', },
]

const getCandidate = Object.keys(fields).reduce((obj, field) => {
    obj[field] = function (cb) {
        setTimeout(() => {
            cb(filter_enum_autocomplete_candidate)
        }, 1000)
    }
    return obj
}, {})

export default {
    config: {
        filter_enum_select_candidate: [
            { id: 4, name: 'value1', },
            { id: 5, name: 'value2', },
            { id: 6, name: 'value3', },
        ],
        filter_enum_autocomplete_candidate,
        getCandidate,
    },
    components: {
        filter_enum_select,
        filter_enum_autocomplete,
        filter_enum_select_async,
        filter_enum_autocomplete_async,
    },
    data () {
        return {
            filter_enum_select: 'all',
            filter_enum_autocomplete: 'all',
            filter_enum_select_async: -1,
            filter_enum_autocomplete_async: -1,
        }
    },
}

</script>
