<template>
 <header class="admin-header">
    <div class="pull-left">
        <a>管理系统</a>
    </div>
    <div class="pull-right">
        <a class="pull-left">{{$store.state.userInfo.name}}</a>
        <a @click="doLogout" class="pull-left">退出</a>
    </div>
 </header>   
</template>

<script>
export default{
    data(){
        return {

        }
    },
    methods:{
        doLogout(){
            this.$store.dispatch('doLogout');
        }
    }
}
</script>

<style scoped>
.admin-header{
    padding:0 30px;
    background-color:#101010;
}
.admin-header a{
    display:block;
    padding:10px 15px;
    line-height:20px;
    color:#9d9d9d;
    font-size:14px;
    cursor:pointer;
}
.admin-header a:hover{
    color:#fff;
}
</style>