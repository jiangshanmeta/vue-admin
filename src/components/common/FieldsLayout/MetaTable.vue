<template>
    <table
        class="table"
    >
        <tbody>
            <tr
                v-for="(row,rowIndex) in fieldLayoutList"
                :key="rowIndex"
            >
                <template
                    v-for="field in row"
                >
                    <th
                        :key="`${field}_th`"
                        :colspan="colspanMapByField[field].label"
                    >
                        <slot
                            name="label"
                            :field="field"
                        />
                    </th>
                    <td
                        :key="`${field}_td`"
                        :colspan="colspanMapByField[field].field"
                    >
                        <slot :field="field" />
                    </td>
                </template>
                <td
                    v-if="restCols[rowIndex]>0"
                    :colspan="restCols[rowIndex]"
                />
            </tr>
        </tbody>
    </table>
</template>

<script>
const defaultColspan = {
    label: 1,
    field: 1,
};

export default {
    name: 'MetaTable',
    props: {
        fieldLayoutList: {
            type: Array,
            required: true,
        },
        mode: {
            type: String,
            required: true,
        },
        fields: {
            type: Object,
            required: true,
        },
    },
    computed: {
        colspanMapByField () {
            return Object.keys(this.fields).reduce((obj, field) => {
                let colspan = defaultColspan;
                const configColspan = this.fields[field].colspan;
                if (configColspan) {
                    if (configColspan[this.mode]) {
                        colspan = configColspan[this.mode];
                    } else if (configColspan.default) {
                        colspan = configColspan.default;
                        if (typeof configColspan.default === 'object') {
                            const exclude = configColspan.default.exclude;
                            if (Array.isArray(exclude) && exclude.includes(this.mode)) {
                                colspan = defaultColspan;
                            }
                        }
                    }

                    if (typeof colspan !== 'object') {
                        colspan = {
                            label: 1,
                            field: colspan,
                        };
                    }
                }

                obj[field] = colspan;
                return obj;
            }, Object.create(null));
        },
        rowColspans () {
            return this.fieldLayoutList.map((row) => {
                return row.reduce((count, field) => {
                    const colspanConfig = this.colspanMapByField[field];
                    return count + colspanConfig.label + colspanConfig.field;
                }, 0);
            });
        },
        maxCol () {
            return Math.max(...this.rowColspans);
        },
        restCols () {
            return this.rowColspans.map((colspan) => {
                return this.maxCol - colspan;
            });
        },
    },
};
</script>
