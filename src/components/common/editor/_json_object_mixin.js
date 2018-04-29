export default{
    props:{
        struct:{
            type:Function,
            default(){
                return [];
            },
        },
        value:{
            required:true,
        }
    },
    computed:{
        model:{
            get(){
                try{
                    return JSON.parse(this.value);
                }catch(e){
                    return this.struct();
                }
            },
            set(val){
                this.$emit("input",JSON.stringify(val));
            }
        },
    },
}