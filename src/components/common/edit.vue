<template>
    <span>
        <el-button
            v-if="config.edit_link"
            @click="getEditFields"
            size="small"
        >
            编辑
        </el-button>
        <el-dialog
            :title="config.title || '编辑'"
            :visible.sync="isShowEditbox"
            size="large"
        >
            <editor
                :fields="edit_editor"
                ref="editbox"
            ></editor>
            <section slot="footer">
                <el-button @click="isShowEditbox=false">取消</el-button>
                <el-button
                    v-if="config.doedit_link"
                    type="danger"
                    @click="doEdit"
                >
                    确认编辑
                </el-button>
            </section>
        </el-dialog>
    </span>
</template>

<script>
import editor from "@/editor/editor";
import _computed_id_mixin from "./_computed_id_mixin.js";
export default {
    name:"edit",
    mixins:[
        _computed_id_mixin
    ],
    components:{
        editor,
    },
    data(){
        return {
            isShowEditbox:false,
            edit_editor:[],
        }
    },
    props:{
        data:{
            type:Object,
            required:true,
        },
        config:{
            type:Object,
            required:true,
        },
        field_list:{
            type:Object,
            required:true,
        }
    },
    methods:{
        showDialog(){
            this.isShowEditbox = true;
        },
        getEditFields(){
            this.$axios.get(`${this.config.edit_link}/${this.id}`).then((json)=>{
                let fields = json.data.fields;
                this.edit_editor = fields.reduce((arr,row)=>{
                    let rowitem = row.reduce((rowitem,fieldInfo)=>{
                        let field = fieldInfo.field;

                        let value = fieldInfo.hasOwnProperty('value')?fieldInfo.value:(typeof this.field_list[field].default === 'function'? this.field_list[field].default():this.field_list.default );

                        rowitem.push({
                            field,
                            value,
                            label:this.field_list[field].label,
                            editor:this.field_list[field].editor,
                            candidate:this.field_list[field].candidate,
                            placeholder:this.field_list[field].placeholder,
                            uri:this.field_list[field].uri,
                            valuefield:this.field_list[field].valuefield,
                            labelfield:this.field_list[field].labelfield,
                            relates:this.field_list[field].relates,
                            editorcomponent:this.field_list[field].editorcomponent,
                        })
                        return rowitem;
                    },[])

                    arr.push(rowitem);
                    return arr;
                },[]);

                this.showDialog();

            })
        },
        doEdit(){
            let data = this.$refs.editbox.formData;
            this.$axios.post(`${this.config.doedit_link}/${this.id}`,data).then((json)=>{
                this.$message({
                    message:"编辑成功",
                    type:"success",
                    duration:2000,
                });

                this.isShowEditbox = false;
                this.$emit('update');
            })
        },
    },
}
</script>
