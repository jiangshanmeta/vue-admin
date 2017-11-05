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

        },
        docreate_link:{

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
                    let configDefault = (this.field_list[field].editorConfig || {}).default;

                    let value = typeof configDefault === 'function'?configDefault() : configDefault;

                    rowitem.push({
                        field,
                        label:this.field_list[field].label,
                        editor:this.field_list[field].editor,
                        value:value,
                        editorConfig:this.field_list[field].editorConfig,
                        editorComponentPath:this.field_list[field].editorComponentPath,
                        tip:this.field_list[field].tip,
                        validator:this.field_list[field].validator,
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
            this.$refs.createbox.validate().then((data)=>{

                this.$axios.post(this.docreate_link,data).then(()=>{
                    this.$message({
                        message:"创建成功",
                        type:"success",
                        duration:2000,
                    })
                    this.isShowCreatebox = false;
                    this.$emit('create');
                })

            }).catch((err)=>{
                this.$message(err);
            })

        },
    }
}
</script>