<template>
    <div class="app">
        <vue-title :title="$store.state.title.title"></vue-title>
        <top-nav></top-nav>

        <div class="app-section">
            <side-menu
                v-if="$store.state.isLogin"
                class="app-aside"
                :uri="$store.state.uri.path"
                :privilege="$store.state.userInfo.privilege"
            ></side-menu>
            <main 
                class="app-main"
            >
                <router-view ></router-view>
            </main>
        </div>

        <bottom-footer></bottom-footer>
    </div>
</template>

<script>
import topNav from '@/components/index/topnav'
import sideMenu from "@/components/index/menu"
import bottomFooter from "@/components/index/footer"
import vueTitle from "@/widget/title"

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
        // 404页的另一种实现
        // "$route.matched"(matched){
        //     if(!Array.isArray(matched) || matched.length === 0){
        //         this.$router.push({
        //             path:'/index/404'
        //         });
        //     }
        // }
    },
    created (){
        if(this.$localStorage.get('token') && !this.$store.state.isLogin){
            this.$store.dispatch('getUserInfo')
        }
    },
}
</script>

<style scoped>
.app{
    min-height:100vh;
    display:flex;
    flex-direction:column;
}
.app-section{
    flex-grow:1;
    display:flex;
    max-width:100%;
}
.app-aside{
    flex:0 0 auto;
}
.app-main{
    flex:1 1 auto;
    max-width:100%;
    padding:15px;
}
</style>