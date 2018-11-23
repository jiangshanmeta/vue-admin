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
                <td>editor_time_ts</td>
                <td>{{editor_time_ts}}</td>
                <td>
                    <editor_time_ts
                        v-model="editor_time_ts"
                        placeholder="editor_time_ts的placeholder"
                        value-format='timestamp'
                    ></editor_time_ts>
                </td>
            </tr>
            <tr>
                <td>editor_time_day</td>
                <td>{{editor_time_day}}</td>
                <td>
                    <editor_time_day
                        v-model="editor_time_day"
                        placeholder="editor_time_day的placeholder"
                        value-format='yyyy-MM-dd'
                    ></editor_time_day>
                </td>
            </tr>
            <tr>
                <td>editor_time_month</td>
                <td>{{editor_time_month}}</td>
                <td>
                    <editor_time_month
                        v-model="editor_time_month"
                        placeholder="editor_time_month的placeholder"
                        value-format='yyyy-MM'
                    ></editor_time_month>
                </td>
            </tr>
            <tr>
                <td>editor_time_year</td>
                <td>{{editor_time_year}}</td>
                <td>
                    <editor_time_year
                        v-model="editor_time_year"
                        placeholder="editor_time_year的placeholder"
                    ></editor_time_year>
                </td>
            </tr>
        </tbody>
    </table>

    
</section>
</template>

<script>
import editor_time_ts from "@/components/common/editor/editor_time_ts"
import editor_time_day from "@/components/common/editor/editor_time_day"
import editor_time_month from "@/components/common/editor/editor_time_month"
import editor_time_year from "@/components/common/editor/editor_time_year"
export default{
    components:{
        editor_time_ts,
        editor_time_day,
        editor_time_month,
        editor_time_year
    },
    methods:{
        formatMethod(value){
            console.log(value);
            return value;
        },
    },
    data(){
        return {
            editor_time_ts:"",
            editor_time_day:"",
            editor_time_month:"",
            editor_time_year:""
        }
    },
    mounted(){
        setTimeout(()=>{
            this.editor_time_ts = Date.now();
            this.editor_time_day = "2019-03-12";
            this.editor_time_month = "2019-03";
            this.editor_time_year = '2011'
        },1000)
    }
}

</script>