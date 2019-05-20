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
                    <td>FieldFileMulti</td>
                    <td>{{FieldFileMulti}}</td>
                    <td>
                        <FieldFileMulti
                            v-model="FieldFileMulti"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                        ></FieldFileMulti>
                    </td>
                </tr>
                <tr>
                    <td>FieldFileMultiJson</td>
                    <td>{{FieldFileMultiJson}} || {{typeof FieldFileMultiJson}}</td>
                    <td>
                        <FieldFileMultiJson
                            v-model="FieldFileMultiJson"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                        ></FieldFileMultiJson>
                    </td>
                </tr>

                <tr>
                    <td>FieldFileMono</td>
                    <td>{{FieldFileMono}}</td>
                    <td>
                        <FieldFileMono
                            v-model="FieldFileMono"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                            :isMonoValid="isMonoValid"
                        ></FieldFileMono>
                    </td>
                </tr>

                <tr>
                    <td>FieldFileMonoJson</td>
                    <td>{{FieldFileMonoJson}} || {{typeof FieldFileMonoJson}}</td>
                    <td>
                        <FieldFileMonoJson
                            v-model="FieldFileMonoJson"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                            :isMonoValid="isMonoValid"

                        ></FieldFileMonoJson>
                    </td>
                </tr>

                <tr>
                    <td>FieldImageMulti</td>
                    <td>{{FieldImageMulti}}</td>
                    <td>
                        <FieldImageMulti
                            v-model="FieldImageMulti"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                        ></FieldImageMulti>

                    </td>
                </tr>
                <tr>
                    <td>FieldImageMultiJson</td>
                    <td>{{FieldImageMultiJson}}</td>
                    <td>
                        <FieldImageMultiJson
                            v-model="FieldImageMultiJson"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                        ></FieldImageMultiJson>

                    </td>
                </tr>

                <tr>
                    <td>FieldImageMono</td>
                    <td>{{FieldImageMono}}</td>
                    <td>
                        <FieldImageMono
                            v-model="FieldImageMono"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                            :isMonoValid="isMonoValid"
                        ></FieldImageMono>
                    </td>
                </tr>
                <tr>
                    <td>FieldImageMonoJson</td>
                    <td>{{FieldImageMonoJson}}</td>
                    <td>
                        <FieldImageMonoJson
                            v-model="FieldImageMonoJson"
                            :action="uri"
                            :getName="getName"
                            :getUrl="getUrl"
                            :getInfoFromResponse="getInfoFromResponse"
                            :isMonoValid="isMonoValid"
                        ></FieldImageMonoJson>
                    </td>
                </tr>
            -->
            </tbody>
        </table>
    </section>
</template>

<script>
/* eslint-disable */
import FieldFileMulti from '@/components/common/Editors/FieldFileMulti'
import FieldFileMultiJson from '@/components/common/Editors/FieldFileMultiJson'
import FieldFileMono from '@/components/common/Editors/FieldFileMono'
import FieldFileMonoJson from '@/components/common/Editors/FieldFileMonoJson'

import FieldImageMulti from '@/components/common/Editors/FieldImageMulti'
import FieldImageMultiJson from '@/components/common/Editors/FieldImageMultiJson'
import FieldImageMono from '@/components/common/Editors/FieldImageMono'
import FieldImageMonoJson from '@/components/common/Editors/FieldImageMonoJson'

import metaUpload from '@/components/common/Editors/meta-upload'

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

        FieldFileMulti,
        FieldFileMultiJson,
        FieldFileMono,
        FieldFileMonoJson,

        FieldImageMulti,
        FieldImageMultiJson,
        FieldImageMono,
        FieldImageMonoJson
    },
    data () {
        return {
            metaUpload: [],

            FieldFileMulti: [{ name: 'abc.jpg', uri: 'http://www.ci.com/uploads/1.jpg' }],
            FieldFileMultiJson: [],
            FieldFileMono: {
                // name:"abc.jpg",
                // uri:"http://www.ci.com/uploads/1.jpg",
            },
            FieldFileMonoJson: {},

            FieldImageMulti: [],
            FieldImageMultiJson: {},
            FieldImageMono: {},
            FieldImageMonoJson: {}
        }
    }
}

</script>
