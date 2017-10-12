<template>
<section style="display:inline-block;">
    <el-button type="primary" v-if="create_link" @click="handleClick">
        新建
    </el-button>
    <el-dialog
        title="创建"
        :visible.sync="isShowCreatebox"
        size="large"

    >
        <editor :fields="create_editor" ref="createbox"></editor>
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
    name:"create",
    components:{
        editor,
    },
    data (){
        return {
            isShowCreatebox:false,
            create_fields:[],
            create_editor:[],
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
        field_list:{
            type:Object,
            required:true,
        },
    },
    watch:{
        create_link(){
            this.init();
        }
    },
    methods:{
        showDialog(){
            this.isShowCreatebox = true;
        },
        init(){
            this.create_fields = [];
            this.create_editor = [];
        },
        initEditor(){
            this.create_editor = this.create_fields.reduce((arr,row)=>{
                let rowitem = row.reduce((rowitem,field)=>{
                    let value = typeof this.field_list[field].default === 'function'?this.field_list[field].default() : this.field_list[field].default;

                    rowitem.push({
                        label:this.field_list[field].label,
                        editor:this.field_list[field].editor,
                        value:value,
                        candidate:this.field_list[field].candidate,
                        placeholder:this.field_list[field].placeholder,
                        uri:this.field_list[field].uri,
                        valuefield:this.field_list[field].valuefield,
                        labelfield:this.field_list[field].labelfield,
                        relates:this.field_list[field].relates,
                        field,
                        default:this.field_list[field].default,
                        editorcomponent:this.field_list[field].editorcomponent,
                    })
                    return rowitem;
                },[]);

                arr.push(rowitem)
                return arr;
            },[])
        },
        resetEditor(){
            this.create_editor.forEach((row)=>{
                row.forEach((item)=>{
                    item.value = typeof item.default==='function'?item.default():item.default;
                })
            })
        },
        handleClick(){
            if(this.create_fields.length === 0){
                this.$axios.get(this.create_link).then((json)=>{
                    this.create_fields = json.data.fields;
                    this.initEditor();
                    this.showDialog()
                })
            }else{
                this.resetEditor();
                this.showDialog()
            }    
        },
        doCreate(){
            let data = this.$refs.createbox.formData;
            this.$axios.post(this.docreate_link,data).then(()=>{
                this.$message({
                    message:"创建成功",
                    type:"success",
                    duration:2000,
                })
                this.isShowCreatebox = false;
                this.$emit('create');
            })
        },
    }
}
</script>