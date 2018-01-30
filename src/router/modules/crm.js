export default{
    label:"客户",
    icon:'el-icon-share',
    name:"crm",
    pages:[
        {
            path:'/crm/index',
            component:()=>import('@/pages/common/listView.js'),
            label:'客户列表',
            meta:{
                privilege:[1,999],
                model:"userModel",
                title:"客户列表",
            },
        },

    ]
}