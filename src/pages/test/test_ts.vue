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
                <td>field_ts</td>
                <td>{{field_ts}}</td>
                <td>
                    <field_ts
                        v-model="field_ts"
                        placeholder="field_ts的placeholder"
                        value-format='timestamp'
                    ></field_ts>
                </td>
            </tr>
            <tr>
                <td>field_day</td>
                <td>{{field_day}}</td>
                <td>
                    <field_day
                        v-model="field_day"
                        placeholder="field_day的placeholder"
                        value-format='yyyy-MM-dd'
                    ></field_day>
                </td>
            </tr>
            <tr>
                <td>field_month</td>
                <td>{{field_month}}</td>
                <td>
                    <field_month
                        v-model="field_month"
                        placeholder="field_month的placeholder"
                        value-format='yyyy-mm'
                    ></field_month>
                </td>
            </tr>
            <tr>
                <td>field_year</td>
                <td>{{field_year}}</td>
                <td>
                    <field_year
                        v-model="field_year"
                        placeholder="field_year的placeholder"
                    ></field_year>
                </td>
            </tr>
        </tbody>
    </table>

    
</section>
</template>

<script>
import field_ts from "@/components/common/editor/field_ts"
import field_day from "@/components/common/editor/field_day"
import field_month from "@/components/common/editor/field_month"
import field_year from "@/components/common/editor/field_year"
export default{
    components:{
        field_ts,
        field_day,
        field_month,
        field_year
    },
    methods:{
        formatMethod(value){
            console.log(value);
            return value;
        },
    },
    data(){
        return {
            field_ts:"",
            field_day:"",
            field_month:"",
            field_year:""
        }
    },
    mounted(){
        setTimeout(()=>{
            this.field_ts = Date.now();
            this.field_day = "2019-03-12";
            this.field_month = "2019-03";
            this.field_year = '2011'
        },1000)
    }
}

</script>