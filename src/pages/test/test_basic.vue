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
                <td>editor_number</td>
                <td>{{editor_number}}</td>
                <td>
                    <editor_number
                        v-model="editor_number"
                        placeholder="placeholder"
                    ></editor_number>
                </td>
            </tr>
            <tr>
                <td>editor_int</td>
                <td>{{editor_int}}</td>
                <td>
                    <editor_int
                        v-model="editor_int"
                        placeholder="sssss"
                    ></editor_int>
                </td>
            </tr>
            <tr>
                <td>editor_string</td>
                <td>{{editor_string}}</td>
                <td>
                    <editor_string
                        v-model="editor_string"
                        placeholder="editor_string"
                    ></editor_string>
                </td>
            </tr>
            <tr>
                <td>editor_text</td>
                <td>{{editor_text}}</td>
                <td>
                    <editor_text
                        v-model="editor_text"
                        placeholder="placeholder"
                    ></editor_text>
                </td>
            </tr>
            <tr>
                <td>editor_pwd</td>
                <td>{{editor_pwd}}</td>
                <td>
                    <editor_pwd
                        v-model="editor_pwd"
                        placeholder="editor_pwd"
                    ></editor_pwd>
                </td>
            </tr>
        </tbody>
    </table>
</section>
</template>

<script>
import editor_number from "@/components/common/editor/editor_number"
import editor_int from "@/components/common/editor/editor_int"
import editor_string from "@/components/common/editor/editor_string"
import editor_text from "@/components/common/editor/editor_text"
import editor_pwd from "@/components/common/editor/editor_pwd"

export default{
    components:{
        editor_number,
        editor_int,
        editor_string,
        editor_text,
        editor_pwd,
    },
    data(){
        return {
            editor_number:0,
            editor_int:0,
            editor_string:"",
            editor_text:"",
            editor_pwd:"",
        }
    },
    created(){

    }
}
</script>