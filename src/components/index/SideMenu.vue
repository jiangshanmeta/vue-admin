<template>
    <el-menu
        :router="true"
        :default-active="path"
        style="width:200px;"
        :unique-opened="true"
    >
        <el-submenu
            v-for="menuItem in computedMenu"
            :key="menuItem.name"
            :index="menuItem.name"
        >
            <template #title>
                <i :class="menuItem.icon" />
                {{ menuItem.label }}
            </template>
            <el-menu-item
                v-for="subMenuItem in menuItem.children"
                :key="subMenuItem.path"
                :index="subMenuItem.path"
            >
                {{ subMenuItem.label }}
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
import menu from '@/router/menu';
export default {
    name: 'SideMenu',
    props: {
        path: {
            type: String,
            default: '',
        },
    },
    computed: {
        computedMenu () {
            return menu.reduce((menuList, item) => {
                const pages = item.pages;
                if (!Array.isArray(pages)) {
                    return menuList;
                }
                const menuItem = {};
                menuItem.children = pages.reduce((arr, subItem) => {
                    if (subItem.menuHide) {
                        return arr;
                    }
                    arr.push({
                        label: subItem.label,
                        path: subItem.path,
                    });
                    return arr;
                }, []);
                if (menuItem.children.length === 0) {
                    return menuList;
                }
                menuItem.label = item.label;
                menuItem.icon = item.icon;
                menuItem.name = item.name;
                menuList.push(menuItem);
                return menuList;
            }, []);
        },
    },
};
</script>
