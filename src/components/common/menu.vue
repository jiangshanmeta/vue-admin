<template>
    <v-menu :menu="menu" v-if="$store.state.isLogin"></v-menu>
</template>

<script>
import vMenu from "@/widget/menu"
import defaultMenu from "@/router/menu"




export default{
    created(){
        this.$watch(function(){
            return this.$store.state.isLogin
        },function(isLogin){
            if(!isLogin){
                this.menu = [];
            }else{
                this.menu = defaultMenu;
            }
        });
    },
    data(){
        return {
            menu:[],
        }
    },
    components:{
        vMenu,
    }
}
</script>