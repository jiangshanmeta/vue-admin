export default{
    label:"订单",
    icon:"el-icon-setting",
    name:"book",
    pages:[
        {
            path:"/book/index",
            label:"订单列表",
            component:()=>import('@/pages/common/metaPage'),
            meta:{
                privilege:[73,999],
                model:"bookModel",
                title:"订单列表",
            }
        },

    ]
}