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
                <td>field_number</td>
                <td>{{field_number}}</td>
                <td>
                    <field_number
                        v-model="field_number"
                        placeholder="placeholder"
                    ></field_number>
                </td>
            </tr>
            <tr>
                <td>field_int</td>
                <td>{{field_int}}</td>
                <td>
                    <field_int
                        v-model="field_int"
                        placeholder="sssss"
                    ></field_int>
                </td>
            </tr>
            <tr>
                <td>field_string</td>
                <td>{{field_string}}</td>
                <td>
                    <field_string
                        v-model="field_string"
                        placeholder="field_string"
                    ></field_string>
                </td>
            </tr>
            <tr>
                <td>field_text</td>
                <td>{{field_text}}</td>
                <td>
                    <field_text
                        v-model="field_text"
                        placeholder="placeholder"
                    ></field_text>
                </td>
            </tr>
            <tr>
                <td>field_pwd</td>
                <td>{{field_pwd}}</td>
                <td>
                    <field_pwd
                        v-model="field_pwd"
                        placeholder="field_pwd"
                    ></field_pwd>
                </td>
            </tr>
        </tbody>
    </table>
</section>
</template>

<script>
import field_number from "@/components/common/editor/field_number"
import field_int from "@/components/common/editor/field_int"
import field_string from "@/components/common/editor/field_string"
import field_text from "@/components/common/editor/field_text"
import field_pwd from "@/components/common/editor/field_pwd"

export default{
    components:{
        field_number,
        field_int,
        field_string,
        field_text,
        field_pwd,
    },
    data(){
        return {
            field_number:0,
            field_int:0,
            field_string:"",
            field_text:"",
            field_pwd:"",
        }
    },
    created(){

    }
}
</script>