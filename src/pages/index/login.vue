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
export default{
    data (){
        return {
            phone:'',
            pwd:'',
        }
    },
    created(){
        this.$watch(function(){
            return this.$store.state.isLogin
        },function(isLogin){
            console.log(isLogin)
            if(isLogin){
                this.redirect()
            }
        })
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
                phone:phone,
                pwd:pwd,
            }
            this.$axios.post('/index/doLogin',data).then((json)=>{
                this.$store.commit('doLogin',json.data.token);
                this.$store.dispatch('getUserInfo')
            })

        },
        redirect(){
            this.$router.replace({
                path:this.$route.query.redirect || '/'
            })
        }


    },

}
</script>