export default{
    field_list:{
        customername:{
            label:'客户名',
            editorComponent:{
                name:"field_string",
                config:{
                    placeholder:'请输入客户名',
                    default:'',
                }
            },
            // editor:'field_string',
            // editorConfig:{
            //     placeholder:'请输入客户名',
            //     default:'',
            // },
        },
        totalprice:{
            label:'金额',
            editorComponent:{
                name:"field_number",
                config:{
                    default:0,
                }
            },
            // editor:'field_number',
            // editorConfig:{
            //     default:0,
            // },
            
        },
        address:{
            label:"收货地址",
            editorComponent:{
                name:"field_text",
            },
            // editor:"field_text",
        },
        store:{
            label:"店铺",
            editorComponent:{
                name:"field_async_enum_select",
                config:{
                    default:"",
                    uri:"/book/storeList",
                    labelfield:"storename",
                    valuefield:"_id",
                }
            },
            // editor:"field_async_enum_select",
            // editorConfig:{
            //     default:"",
            //     uri:"/book/storeList",
            //     labelfield:"storename",
            //     valuefield:"_id",
            // },
        },
        saler:{
            label:"销售",
            editorComponent:{
                name:"field_relates_enum_select",
                config:{
                    relates:{
                        store:{
                            inValidValue:"",
                            relatefield:"store"
                        }
                    },
                    default:"",
                    uri:"book/salerList",
                }
            },
            // editor:"field_relates_enum_select",
            // editorConfig:{
            //     relates:{
            //         store:{
            //             inValidValue:"",
            //             relatefield:"store"
            //         }
            //     },
            //     default:"",
            //     uri:"book/salerList",
            // },
        },
    },
    createConfig:{
        createLink:'/book/create',
        doCreateLink:'/book/docreate',
    },
    listConfig:{
        baseUrl:"/book/list",
    },
    filters:[
        {
            "label":"客户名",
            "field":"customername",
            "editor":"field_string",
            "config":{
                "placeholder":"请输入客户名",
            },
            "default":""
        },
        {
            "label":"金额",
            "field":"totalprice",
            "editor":"field_number",
            "default":500,
        },
    ],
    operators:[
        {
            component:"edit",
            componentPath:"components/common/edit",
            config:{
                editLink:"/book/edit_link",
                doEditLink:"/book/doedit_link",
                title:"编辑订单"
            }
        },
        {
            "label":"再来一单",
            "type":"success",
            function(data){
                this.$message({
                    message:data.customername+"再来一单",
                    type:"success",
                    duration:2000
                })
            }
        }

    ]
}