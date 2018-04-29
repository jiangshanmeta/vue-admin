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

<!--                 <tr>
                    <td>field_images</td>
                    <td>{{field_images}}</td>
                    <td>
                        <field_images
                            v-model="field_images"
                            :uri="uri"
                            valuefield="uri"
                        ></field_images>
                    </td>
                </tr>
                <tr>
                    <td>field_image</td>
                    <td>{{field_image}}</td>
                    <td>
                        <field_image
                            v-model="field_image"
                            :uri="uri"
                            valuefield="uri"
                        ></field_image>
                    </td>
                </tr> -->
            </tbody>
        </table>

    </section>
</template>

<script>
import field_file_multi from "@/components/common/editor/field_file_multi"
import field_file_multi_json from "@/components/common/editor/field_file_multi_json"
import field_file_mono from "@/components/common/editor/field_file_mono"
import field_file_mono_json from "@/components/common/editor/field_file_mono_json"


import field_images from "@/components/common/editor/field_images.vue"
import field_image from "@/components/common/editor/field_image"
export default{
    config:{
        uri:"http://www.ci.com/index.php/index/upload",
        getInfoFromResponse:function(response){
            return response.data;
        },
        getName(item){
            return item.name;
        },
        getUrl(item){
            return item.uri;
        },
        isMonoValid(item){
            return item.hasOwnProperty('uri');
        },
        fileMonoStruct(){
            return {}
        },
    },
    components:{
        field_file_multi,
        field_file_multi_json,
        field_file_mono,
        field_file_mono_json,


        field_images,
        field_image,
    },
    data(){
        return {
            field_file_multi:[{name:"abc.jpg",uri:"http://www.ci.com/uploads/1.jpg"}],
            field_file_multi_json:JSON.stringify([]),
            field_file_mono:{
                name:"abc.jpg",
                uri:"http://www.ci.com/uploads/1.jpg",
            },
            field_file_mono_json:{},
            field_images:[],
            field_image:[],
        }
    }
}

</script>