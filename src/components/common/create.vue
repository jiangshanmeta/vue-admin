<template>
<section>
    <el-button type="primary" v-if="create_link" @click="showCreateBox">
        新建
    </el-button>
    <el-dialog
        title="创建"
        :visible.sync="isShowCreatebox"
        size="large"

    >
        <editor :fields="create_fields" ref="createbox"></editor>
        <div slot="footer">
            <el-button @click="isShowCreatebox=false">取消</el-button>
            <el-button @click="doCreate" type="success" v-if="docreate_link">确认创建</el-button>
        </div>
    </el-dialog>


</section>
</template>

<script>
import editor from "@/editor/editor"
export default{
    components:{
        editor,
    },
    data (){
        return {
            isShowCreatebox:false,
            create_fields:[],
        }
    },
    props:{
        create_link:{
            type:String,
            required:true,
        },
        docreate_link:{
            type:String,
            required:true,
        },
    },
    methods:{
        init(){
            this.create_fields = [];
        },
        showCreateBox(){
            if(this.create_fields.length===0){
                this.$axios.get(this.create_link).then((json)=>{
                    let data = json.data;
                    if(data.fields){
                        this.create_fields = data.fields;
                        this.isShowCreatebox = true;
                    }
                })
            }else{
                this.isShowCreatebox = true;
            }
            
        },
        doCreate(){
            let data = this.$refs.createbox.getData();
            this.$axios.post(this.docreate_link,data).then(()=>{
                this.isShowCreatebox = false;
                this.$emit('create',json.data);
            })
            // console.log(data)
        },
    }
}
</script>