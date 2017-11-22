<template>
    <div id="app" style="min-height:100vh;display:flex;flex-direction:column;">
        <vue-title v-cloak>{{$store.state.title.title}}</vue-title>
        <top-nav></top-nav>

        <div style="flex-grow:1;display:flex;max-width:100%;">
            <side-menu 
                style="flex:0 0 auto;"
                :uri="$store.state.uri.path"
                :is-login="$store.state.isLogin"
                :privilege="$store.state.userInfo.privilege"
            ></side-menu>
            <main style="flex:1 1 auto;max-width:100%;padding:15px;">
                <router-view ></router-view>
            </main>
        </div>

        <bottom-footer></bottom-footer>
    </div>
</template>

<script>
import topNav from '@/components/common/topnav'
import sideMenu from "@/components/common/menu"
import bottomFooter from "@/components/common/footer"
import vueTitle from "@/widget/title.vue"

export default {
	name:'app',
	components:{
		topNav,
		sideMenu,
		bottomFooter,
		vueTitle,
	},
    watch:{
        "$store.state.isLogin"(isLogin){
            if(isLogin){
                this.$router.replace({
                    path:this.$store.state.uri.redirect || '/'
                })
            }else{
                this.$router.push({
                    path:'/index/login'
                })
            }
        },
    },
    created (){
        if(this.$localStorage.get('token') && !this.$store.state.isLogin){
            this.$store.dispatch('getUserInfo')
        }
    },
}
</script>

<style>
[v-cloak] {
    display: none;
}
</style>
