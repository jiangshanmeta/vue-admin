<template>
    <section>
        {{field_file}}
        <field_file 
            v-model="field_file"
            uri="http://www.ci.com/index.php/index/upload"
            valuefield="uri"
        ></field_file>
        {{field_images}}
        <field_images
            v-model="field_images"
            uri="http://www.ci.com/index.php/index/upload"
            valuefield="uri"

        ></field_images>

        {{field_image}}
        <field_image
            v-model="field_image"
            uri="http://www.ci.com/index.php/index/upload"
            valuefield="uri"

        ></field_image>
    </section>
</template>

<script>
import field_file from "@/editor/field_file.vue"
import field_images from "@/editor/field_images.vue"
import field_image from "@/editor/field_image"
export default{
    components:{
        field_file,
        field_images,
        field_image,
    },
    data(){
        return {
            field_file:[{name:"abc.jpg",uri:"http://www.ci.com/uploads/1.jpg"}],
            field_images:[],
            field_image:[],
        }
    }
}

</script>