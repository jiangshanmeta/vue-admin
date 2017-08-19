<template>
    <el-autocomplete
        v-model="model"
        :props="{value:valuefield,label:labelfield}"
        :fetch-suggestions="queryModel"
    ></el-autocomplete>
</template>

<script>
import model_mixin from "./model_mixin.js"
import label_value_mixin from "./label_value_mixin"

export default{
    mixins:[model_mixin,label_value_mixin],
    data(){
        return {
            // candidate:[]
        }
    },
    props:{
        keywordfield:{
            type:String,
            default:'keyword'
        },
        uri:{
            type:String,
            required:true,
        },
        check_can_query:{
            type:Function,
            default:()=>{return true},
        }
    },
    methods:{
        queryModel(queryString='',cb){
            let params = {};
            if(!this.check_can_query(queryString)){
                return;
            }
            params[this.keywordfield] = queryString;
            this.$axios.get(this.uri,{params}).then((json)=>{
                cb(json.data.data);
            })
        }
    },
}



// import {formHelper} from "./mixins"
// export default{
//     data (){
//         return {
//             currentValue:this.value,
//         }
//     },
//     mixins:[formHelper],
//     props:{
//         value:{

//         },
//         candidate:{
//             type:Array,
//             required:true,
//         },
//         placeholder:{
//             default:'',
//         },

//     },
//     created(){
//         this._asyncProp('currentValue','value');
//         this._notifyInput('currentValue');
//     },
// }
</script>