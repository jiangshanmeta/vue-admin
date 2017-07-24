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
                this.$axios.get('/index/getMenuByUserPrivilege').then((json)=>{
                    let backendMenu = json.data.menu;
                    let menu = defaultMenu.reduce(function(finalMenu,menuItem){
                        let controller_name = menuItem.controller_name;
                        if(backendMenu[controller_name] && typeof backendMenu[controller_name] === 'object'){
                            let subMenu = [];
                            let backendSubmenu = backendMenu[controller_name];
                            let children = menuItem.children;
                            children.forEach(function(submenuitem){
                                let method_name = submenuitem.method_name;
                                if(backendSubmenu[method_name]){
                                    subMenu.push({
                                        method_name:method_name,
                                        label:submenuitem.label
                                    })
                                }
                            })

                            if(subMenu.length>0){
                                finalMenu.push({
                                    label:menuItem.label,
                                    controller_name:controller_name,
                                    icon:menuItem.icon,
                                    children:subMenu
                                })
                            }


                        }
                        return finalMenu;
                    },[]);

                    this.menu = menu;
                })
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