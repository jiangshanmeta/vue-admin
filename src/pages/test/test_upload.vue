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
                    <td>metaUpload</td>
                    <td>{{ metaUpload }}</td>
                    <td>
                        <meta-upload
                            v-model="metaUpload"
                            multiple
                            list-type="picture-card"
                            :parse-response="parseResponse"
                            action=""
                            :http-request="httpRequest"
                        >
                            <el-button
                                size="small"
                                type="primary"
                            >
                                点击上传
                            </el-button>
                        </meta-upload>
                    </td>
                </tr>

                <!--
                <tr>
                    <td>field_file_multi</td>
                    <td>{{field_file_multi}}</td>
                    <td>
                        <field_file_multi
                            v-model="field_file_multi"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                        ></field_file_multi>
                    </td>
                </tr>
                <tr>
                    <td>field_file_multi_json</td>
                    <td>{{field_file_multi_json}} || {{typeof field_file_multi_json}}</td>
                    <td>
                        <field_file_multi_json
                            v-model="field_file_multi_json"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                        ></field_file_multi_json>
                    </td>
                </tr>

                <tr>
                    <td>field_file_mono</td>
                    <td>{{field_file_mono}}</td>
                    <td>
                        <field_file_mono
                            v-model="field_file_mono"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                            :isMonoValid="isMonoValid"
                        ></field_file_mono>
                    </td>
                </tr>

                <tr>
                    <td>field_file_mono_json</td>
                    <td>{{field_file_mono_json}} || {{typeof field_file_mono_json}}</td>
                    <td>
                        <field_file_mono_json
                            v-model="field_file_mono_json"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                            :isMonoValid="isMonoValid"

                        ></field_file_mono_json>
                    </td>
                </tr>

                <tr>
                    <td>field_image_multi</td>
                    <td>{{field_image_multi}}</td>
                    <td>
                        <field_image_multi
                            v-model="field_image_multi"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                        ></field_image_multi>

                    </td>
                </tr>
                <tr>
                    <td>field_image_multi_json</td>
                    <td>{{field_image_multi_json}}</td>
                    <td>
                        <field_image_multi_json
                            v-model="field_image_multi_json"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                        ></field_image_multi_json>

                    </td>
                </tr>

                <tr>
                    <td>field_image_mono</td>
                    <td>{{field_image_mono}}</td>
                    <td>
                        <field_image_mono
                            v-model="field_image_mono"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                            :isMonoValid="isMonoValid"
                        ></field_image_mono>
                    </td>
                </tr>
                <tr>
                    <td>field_image_mono_json</td>
                    <td>{{field_image_mono_json}}</td>
                    <td>
                        <field_image_mono_json
                            v-model="field_image_mono_json"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                            :isMonoValid="isMonoValid"
                        ></field_image_mono_json>
                    </td>
                </tr>
            -->
            </tbody>
        </table>
    </section>
</template>

<script>
/* eslint-disable */
import field_file_multi from '@/components/common/editor/field_file_multi'
import field_file_multi_json from '@/components/common/editor/field_file_multi_json'
import field_file_mono from '@/components/common/editor/field_file_mono'
import field_file_mono_json from '@/components/common/editor/field_file_mono_json'

import field_image_multi from '@/components/common/editor/field_image_multi'
import field_image_multi_json from '@/components/common/editor/field_image_multi_json'
import field_image_mono from '@/components/common/editor/field_image_mono'
import field_image_mono_json from '@/components/common/editor/field_image_mono_json'

import metaUpload from '@/components/common/editor/meta-upload'

const map = {
    0: 'https://pic2.zhimg.com/v2-c6a5da50f5fa6a6751bf531d49778951_xl.jpg',
    1: 'https://pic3.zhimg.com/v2-dcc9189fcbb59729102af01da7054ebe_xl.jpg',
    2: 'https://pic4.zhimg.com/05836cca8e18915f65090b2e1449e77b_xl.png'
}
let count = 0

export default {
    config: {
        uri: 'http://www.ci.com/index.php/index/upload'
    },
    staticMethod: {
        getInfoFromResponse: function (response) {
            return response.data
        },
        getName (item) {
            return item.name
        },
        getUrl (item) {
            return item.uri
        },
        isMonoValid (item) {
            return item.hasOwnProperty('uri')
        },
        fileMonoStruct () {
            return {}
        },
        httpRequest (options) {
            console.log(options)
            setTimeout(() => {
                options.onProgress({ percent: 25 })
            }, 1000)

            setTimeout(() => {
                options.onProgress({ percent: 50 })
            }, 2000)

            setTimeout(() => {
                options.onProgress({ percent: 75 })
            }, 3000)

            setTimeout(() => {
                options.onSuccess({ src: map[count++] })
                count %= 3
            }, 4000)
        },
        parseResponse (json) {
            return { url: json.src }
        }
    },
    components: {
        metaUpload,

        field_file_multi,
        field_file_multi_json,
        field_file_mono,
        field_file_mono_json,

        field_image_multi,
        field_image_multi_json,
        field_image_mono,
        field_image_mono_json
    },
    data () {
        return {
            metaUpload: [],

            field_file_multi: [{ name: 'abc.jpg', uri: 'http://www.ci.com/uploads/1.jpg' }],
            field_file_multi_json: [],
            field_file_mono: {
                // name:"abc.jpg",
                // uri:"http://www.ci.com/uploads/1.jpg",
            },
            field_file_mono_json: {},

            field_image_multi: [],
            field_image_multi_json: {},
            field_image_mono: {},
            field_image_mono_json: {}
        }
    }
}

</script>
