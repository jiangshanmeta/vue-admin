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
                    <td>EditorArrayFile</td>
                    <td>{{ EditorArrayFile }} | {{ typeof EditorArrayFile }}</td>
                    <td>
                        <EditorArrayFile
                            v-model="EditorArrayFile"
                            :http-request="httpRequest"
                            list-type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayImage</td>
                    <td>{{ EditorArrayImage }} | {{ typeof EditorArrayImage }}</td>
                    <td>
                        <EditorArrayImage
                            v-model="EditorArrayImage"
                            :http-request="httpRequest"
                            list-type="text"
                        />
                    </td>
                </tr>

                <tr>
                    <td>EditorArrayJSONFile</td>
                    <td>{{ EditorArrayJSONFile }} | {{ typeof EditorArrayJSONFile }}</td>
                    <td>
                        <EditorArrayJSONFile
                            v-model="EditorArrayJSONFile"
                            :http-request="httpRequest"
                            list-type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorArrayJSONImage</td>
                    <td>{{ EditorArrayJSONImage }} | {{ typeof EditorArrayJSONImage }}</td>
                    <td>
                        <EditorArrayJSONImage
                            v-model="EditorArrayJSONImage"
                            :http-request="httpRequest"
                            list-type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorFile</td>
                    <td>{{ EditorFile }} | {{ typeof EditorFile }}</td>
                    <td>
                        <EditorFile
                            v-model="EditorFile"
                            :http-request="httpRequest"
                            list-type="text"
                            :is-mono-valid="isMonoValid"
                            :mono-struct="monoStruct"
                        />
                    </td>
                </tr>
                <tr>
                    <td>EditorImage</td>
                    <td>{{ EditorImage }} | {{ typeof EditorImage }}</td>
                    <td>
                        <EditorImage
                            v-model="EditorImage"
                            :http-request="httpRequest"
                            list-type="picture"
                            :is-mono-valid="isMonoValid"
                            :mono-struct="monoStruct"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
const pics = [
    'https://pic2.zhimg.com/v2-c6a5da50f5fa6a6751bf531d49778951_xl.jpg',
    'http://dev.anontraveler.com:3000/avatars/5?s=290',
    'https://pic4.zhimg.com/05836cca8e18915f65090b2e1449e77b_xl.png',
];

let count = 0;

export default {
    staticMethod: {
        httpRequest (options) {
            console.log(options);
            setTimeout(() => {
                options.onSuccess(pics[count++]);
                count %= pics.length;
            }, 1000);
        },
        isMonoValid (value) {
            if (value === '') {
                return false;
            }
            return true;
        },
        monoStruct () {
            console.log('mono struct called');
            return '';
        },
    },

    components: {
        EditorArrayFile: () => import('@/components/common/Editors/EditorArrayFile'),
        EditorArrayImage: () => import('@/components/common/Editors/EditorArrayImage'),
        EditorArrayJSONFile: () => import('@/components/common/Editors/EditorArrayJSONFile'),
        EditorArrayJSONImage: () => import('@/components/common/Editors/EditorArrayJSONImage'),
        EditorFile: () => import('@/components/common/Editors/EditorFile'),
        EditorImage: () => import('@/components/common/Editors/EditorImage'),
    },
    data () {
        return {
            EditorArrayFile: [],
            EditorArrayImage: [],
            EditorArrayJSONFile: '[]',
            EditorArrayJSONImage: '[]',
            EditorFile: '',
            EditorImage: '',
        };
    },
};
</script>
