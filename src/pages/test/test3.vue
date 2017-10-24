<template>
    <section>
        {{field_file}}
        <field_file 
            v-model="field_file"
            uri="http://www.ci.com/index.php/index/upload"
        ></field_file>
    </section>
</template>

<script>
import field_file from "@/editor/field_file.vue"

export default{
    components:{
        field_file,
    },
    data(){
        return {
            field_file:[{name:"abc.jpg",url:"http://www.ci.com/uploads/1.jpg"}],

        }
    }
}

</script>