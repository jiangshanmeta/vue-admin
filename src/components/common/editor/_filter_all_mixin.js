export default{
    props:{
        allvalue:{
            default:"",
        },
        alllabel:{
            type:String,
            default:"不限",
        },
        candidate:{
            type:Array,
            default(){
                return [];
            }
        },
    },
    computed:{
        filter_candidate(){
            let [...arr] = this.candidate;
            arr.unshift({
                [this.labelfield]:this.alllabel,
                [this.valuefield]:this.allvalue,
            })
            return arr;
        }
    }
}