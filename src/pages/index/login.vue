<template>
    <el-form>
        <el-form-item label="手机号">
            <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="pwd"></el-input>
        </el-form-item>
        <el-button type="success" @click="doLogin">登录</el-button>
    </el-form>
</template>

<script>
import {doLogin} from "@/server/index.js"
export default{
    data (){
        return {
            phone:'',
            pwd:'',
        }
    },
    methods:{
        doLogin (){
            let phone = this.phone
            if(!phone){
                alert('请输入手机号');
                return;
            }
            let pwd = this.pwd;
            if(!pwd){
                alert('请输入手机号');
                return;
            }
            let data = {
                phone,
                pwd,
            }
            doLogin(data).then((json)=>{
                this.$store.commit('setToken',json.data.token);
                this.$store.dispatch('getUserInfo')
            })

        },
    },
}
</script>