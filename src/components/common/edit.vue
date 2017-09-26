<template>
    <span>
        <el-button
            v-if="edit_link"
            @click="handleClick"
        >
            编辑
        </el-button>
        <el-dialog
            title="编辑"
            :visible.sync="isShowEditbox"
            size="large"
        >
            <editor
                :fields="edit_editor"
            ></editor>
            <section slot="footer">
                <el-button @click="isShowEditbox=false">取消</el-button>
                <el-button
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
import editor from "@/editor/editor"
export default {
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
        edit_link:{
            type:String,
            required:true,
        },
        doedit_link:{
            type:String,
            required:true,
        },
        id:{
            type:[String,Number],
            required:true,
        }
    },
    methods:{
        showDialog(){

        },
        handleClick(){

        },
        doEdit(){

        },
    },
}
</script>


<!-- <template>
    <el-dialog
        title="创建"
        :visible.sync="isShowEditbox"
        size="large"

    >
        <editor :fields="edit_fields" ref="editbox"></editor>
        <div slot="footer">
            <el-button @click="isShowEditbox=false">取消</el-button>
            <el-button @click="doEdit" type="success" v-if="doedit_link">确认更新</el-button>
        </div>
    </el-dialog>

</template>

<script>
import editor from "@/editor/editor"
export default{
    components:{
        editor
    },
    data(){
        return {
            isShowEditbox:false,
            edit_fields:[],
            id:'',
        } 
    },
    props:{
        edit_link:{
            type:String,
            required:true,
        },
        doedit_link:{
            type:String,
            required:true,
        },
    },
    methods:{
        init(){
            this.edit_fields = [];
            this.id = '';
        },
        doEdit(){
            let data = this.$refs.editbox.getData();
            this.$axios.post(this.doedit_link+this.id,data).then((json)=>{
                this.isShowEditbox = false;
                this.$emit('update',json.data);
            })
        },
        show(id){
            this.id = id;

            this.$axios.get(this.edit_link+this.id).then((json)=>{
                let data = json.data;
                if(data.fields){
                    this.edit_fields = data.fields;
                    this.isShowEditbox = true;
                }
            })

        }

    },
}
</script> -->