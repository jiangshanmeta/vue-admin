<template>
    <div class="app">
        <AdminNav />

        <div class="app-section">
            <SideMenu
                v-if="$store.state.isLogin"
                class="app-aside"
                :path="$store.state.route.path"
                :privilege="$store.state.userInfo.privilege"
            />
            <router-view class="app-main" />
        </div>

        <AdminFooter />
    </div>
</template>

<script>
import AdminNav from '@/components/index/AdminNav'
import SideMenu from '@/components/index/SideMenu'
import AdminFooter from '@/components/index/AdminFooter'

export default {
    name: 'App',
    components: {
        AdminNav,
        SideMenu,
        AdminFooter,
    },
    watch: {
        '$store.state.isLogin' (isLogin) {
            if (isLogin) {
                this.$router.replace({
                    path: this.$store.state.route.query.redirect || '/',
                })
            } else {
                this.$router.push({
                    path: '/index/login',
                })
            }
        },
    },
    created () {
        if (this.$localStorage.get('token') && !this.$store.state.isLogin) {
            this.$store.dispatch('getUserInfo')
        }
    },
    metaInfo () {
        return {
            title: this.$store.state.title,
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
