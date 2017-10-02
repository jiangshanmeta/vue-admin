<template>
    <el-menu 
        v-if="$store.state.isLogin"
        :router="true"
        :default-active="defaultActive"
        style="width:200px;"
        :unique-opened="true"
    >
        <el-submenu
            v-for="menuItem in computedMenu"
            :index="menuItem.controller_name"
            :key="menuItem.path"
        >
            <template slot="title">
                <i :class="menuItem.icon"></i>
                {{menuItem.label}}
            </template>
            <el-menu-item
                v-for="subMenuItem in menuItem.children"
                :index="subMenuItem.path"
                :key="subMenuItem.path"
            >
                {{subMenuItem.label}}
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
import menu from "@/router/menu"
export default{
    data(){
        return {
            menu,
        }
    },
    computed:{
        defaultActive(){
            return this.$store.state.uri.path
        },
        controllerPrivilege(){
            return this.menu.reduce((obj,{controller_name,children=[]})=>{
                obj[controller_name] = [];
                children.forEach(({meta:{privilege=[]}={}})=>{
                    for(let item of privilege){
                        if(!obj[controller_name].includes(item)){
                            obj[controller_name].push(item);
                        }
                    }
                })
                return obj;
            },{})
        },
        userPrivilegeHash(){
            return this.$store.state.userInfo.privilege.reduce((obj,item)=>{
                obj[item] = true;
                return obj;
            },{})
        },
        computedMenu(){
            return this.menu.reduce((arr,item)=>{
                let controller_name = item.controller_name;
                if(this.checkHasPrivilege(this.controllerPrivilege[controller_name])){
                    let menuItem = {};
                    menuItem.label = item.label;
                    menuItem.icon = item.icon;
                    menuItem.controller_name = item.controller_name;
 
                    let children = item.children || [];
                    menuItem.children = children.reduce((arr,subMenuItem)=>{
                        if(this.checkHasPrivilege(subMenuItem.meta && subMenuItem.meta.privilege)){
                            arr.push({
                                label:subMenuItem.label,
                                path:subMenuItem.path
                            })
                        }

                        return arr;
                    },[]);

                    arr.push(menuItem);
                }

                return arr;
            },[])
        },
    },
    methods:{
        checkHasPrivilege(privilege=[]){
            for(let item of privilege){
                if(this.userPrivilegeHash.hasOwnProperty(item)){
                    return true;
                }
            }
            return false;
        },
    },
}
</script>