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
                    <td>EditorNumber</td>
                    <td>{{ EditorNumber }}</td>
                    <td>
                        <EditorNumber
                            v-model="EditorNumber"
                            placeholder="placeholder"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorInt</td>
                    <td>{{ EditorInt }}</td>
                    <td>
                        <EditorInt
                            v-model="EditorInt"
                            placeholder="sssss"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorString</td>
                    <td>{{ EditorString }}</td>
                    <td>
                        <EditorString
                            v-model="EditorString"
                            placeholder="EditorString"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorText</td>
                    <td>{{ EditorText }}</td>
                    <td>
                        <EditorText
                            v-model="EditorText"
                            placeholder="placeholder"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorPwd</td>
                    <td>{{ EditorPwd }}</td>
                    <td>
                        <EditorPwd
                            v-model="EditorPwd"
                            placeholder="EditorPwd"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import EditorNumber from '@/components/common/Editors/EditorNumber'
import EditorInt from '@/components/common/Editors/EditorInt'
import EditorString from '@/components/common/Editors/EditorString'
import EditorText from '@/components/common/Editors/EditorText'
import EditorPwd from '@/components/common/Editors/EditorPwd'

export default {
    components: {
        EditorNumber,
        EditorInt,
        EditorString,
        EditorText,
        EditorPwd,
    },
    data () {
        return {
            EditorNumber: 0,
            EditorInt: 0,
            EditorString: '',
            EditorText: '',
            EditorPwd: '',
        }
    },
    created () {

    },
}
</script>
