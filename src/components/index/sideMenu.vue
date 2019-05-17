<template>
    <el-menu
        :router="true"
        :default-active="path"
        style="width:200px;"
        :unique-opened="true"
    >
        <el-submenu
            v-for="menuItem in computedMenu"
            :key="menuItem.path"
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
import menu from '@/router/menu'
export default {
    config: {
        menu,
    },
    props: {
        path: {
            type: String,
            default: '',
        },
        privilege: {
            type: Array,
            default: function () {
                return [
                ]
            },
        },
    },
    computed: {
        controllerPrivilege () {
            return this.menu.reduce((obj, { name, pages = [
            ], }) => {
                obj[name] = new Set()
                pages.forEach(({ meta: { privilege = [
                ], } = {}, }) => {
                    for (let item of privilege) {
                        obj[name].add(item)
                    }
                })
                return obj
            }, {})
        },
        userPrivilegeHash () {
            return this.privilege.reduce((obj, item) => {
                obj[item] = true
                return obj
            }, Object.create(null))
        },
        computedMenu () {
            return this.menu.reduce((arr, item) => {
                let name = item.name
                if (this.checkHasPrivilege(this.controllerPrivilege[name])) {
                    let menuItem = {}
                    menuItem.label = item.label
                    menuItem.icon = item.icon
                    menuItem.name = name

                    let pages = item.pages || [
                    ]
                    menuItem.children = pages.reduce((arr, subMenuItem) => {
                        // 页面从属于某个模块，但是不显示在菜单中
                        if (subMenuItem.meta && subMenuItem.meta.menuHide) {
                            return arr
                        }
                        // console.log(subMenuItem.meta.privilege)
                        if (this.checkHasPrivilege(subMenuItem.meta && subMenuItem.meta.privilege)) {
                            arr.push({
                                label: subMenuItem.label,
                                path: subMenuItem.path,
                            })
                        }

                        return arr
                    }, [
                    ])
                    arr.push(menuItem)
                }

                return arr
            }, [
            ])
        },
    },
    methods: {
        checkHasPrivilege (privilege = [
        ]) {
            // 任何人都能看的菜单项
            if (!privilege.length) {
                return true
            }
            for (let item of privilege) {
                if (this.userPrivilegeHash[item]) {
                    return true
                }
            }
            return false
        },
    },
}
</script>
