<template>
    <div class="app">
        <top-nav />

        <div class="app-section">
            <side-menu
                v-if="$store.state.isLogin"
                class="app-aside"
                :path="$store.state.route.path"
                :privilege="$store.state.userInfo.privilege"
            />
            <router-view class="app-main" />
        </div>

        <bottom-footer />
    </div>
</template>

<script>
import topNav from '@/components/index/topnav'
import sideMenu from '@/components/index/sideMenu'
import bottomFooter from '@/components/index/footer'

export default {
    name: 'App',
    components: {
        topNav,
        sideMenu,
        bottomFooter,
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
