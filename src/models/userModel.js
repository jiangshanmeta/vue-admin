import {getTypConfig} from "@/server/user.js"
const cache = {

}
export default{
    field_list:{
        name:{
            label:'用户名',
            editor:'field_string',
            placeholder:'请输入用户名',
            default:'',
        },
        password:{
            label:'密码',
            editor:'field_pwd',
            placeholder:'请输入密码',
            default:'',
        },
        gender:{
            label:'性别',
            editor:'field_sex',
            default:0,
        },
        typ:{
            label:'类型',
            editor:'field_enum_select',
            candidate:[
                {value:0,label:'路人甲'},
                {value:1,label:'店小二'},
                {value:2,label:'收银员'},
                {value:99,label:'店掌柜'},
                {value:999,label:'管理员'},
            ],
            default:0,
            valuefield:'value',
            labelfield:'label',
        },
        privilege:{
            label:'权限',
            editor:"field_relates_tag",
            uri:'/user/getPrivilege',
            labelfield:'name',
            valuefield:'id',
            relates:{
                usertyp:{
                    inValidValue:0,
                    relatefield:'typ'
                }
            },
            default(){
                return [];
            }
        },
    },
    create_link:'/user/create_link',
    docreate_link:'/user/docreate',
    filters:[
        {
            label:"姓名",
            field:"username",
            editor:"field_string",
            placeholder:"请输入用户姓名",
            default:"",
        },
        {
            label:"类型",
            field:"typ",
            editor:"filter_enum",
            candidate:[
                {value:0,label:'路人甲'},
                {value:1,label:'店小二'},
                {value:2,label:'收银员'},
                {value:99,label:'店掌柜'},
                {value:999,label:'管理员'},
            ],
            allvalue:-1,
            alllabel:"全部",
            default:-1,
        },
        {
            label:"权限",
            field:"privilege",
            editor:"filter_async_enum",
            uri:"/user/getPrivilege",
            valuefield:"id",
            labelfield:"name",
            placeholder:"请选择权限",
            allvalue:"all",
            alllabel:"不限",
            default:"all",
        },

    ],
    baseUrl:"/user/list",
    sortFields:['typ'],
    async treatData(data){
        if(!cache['typCfg']){
            let {data:typCfg} = await getTypConfig();
            cache['typCfg'] = typCfg
        }

        let genderCfg = {
            0:"男",
            1:"女"
        }
        data.forEach((item)=>{
            item['typ'] = cache['typCfg'][item['typ']];
            item['gender'] = genderCfg[item['gender']]
        })
        return data
    },
    operators:[
        {
            label:"搞个大新闻",
            type:"warning",
            function(data){
                console.log(data.name);
                alert('不要总想着搞个大新闻')
            },
        },
        {
            component:"run",
            path:"components/user/run.vue"
        }

    ],
}