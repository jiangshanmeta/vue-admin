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
                    <td>EditorTimeTs</td>
                    <td>{{ EditorTimeTs }}</td>
                    <td>
                        <EditorTimeTs
                            v-model="EditorTimeTs"
                            placeholder="EditorTimeTs的placeholder"
                            value-format="timestamp"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorTimeDay</td>
                    <td>{{ EditorTimeDay }}</td>
                    <td>
                        <EditorTimeDay
                            v-model="EditorTimeDay"
                            placeholder="EditorTimeDay的placeholder"
                            value-format="yyyy-MM-dd"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorTimeMonth</td>
                    <td>{{ EditorTimeMonth }}</td>
                    <td>
                        <EditorTimeMonth
                            v-model="EditorTimeMonth"
                            placeholder="EditorTimeMonth的placeholder"
                            value-format="yyyy-MM"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorTimeYear</td>
                    <td>{{ EditorTimeYear }}</td>
                    <td>
                        <EditorTimeYear
                            v-model="EditorTimeYear"
                            placeholder="EditorTimeYear的placeholder"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import EditorTimeTs from '@/components/common/Editors/EditorTimeTs';
import EditorTimeDay from '@/components/common/Editors/EditorTimeDay';
import EditorTimeMonth from '@/components/common/Editors/EditorTimeMonth';
import EditorTimeYear from '@/components/common/Editors/EditorTimeYear';
export default {
    components: {
        EditorTimeTs,
        EditorTimeDay,
        EditorTimeMonth,
        EditorTimeYear,
    },
    data () {
        return {
            EditorTimeTs: '',
            EditorTimeDay: '',
            EditorTimeMonth: '',
            EditorTimeYear: '',
        };
    },
    mounted () {
        setTimeout(() => {
            this.EditorTimeTs = Date.now();
            this.EditorTimeDay = '2019-03-12';
            this.EditorTimeMonth = '2019-03';
            this.EditorTimeYear = '2011';
        }, 1000);
    },
    methods: {
        formatMethod (value) {
            console.log(value);
            return value;
        },
    },
};

</script>
