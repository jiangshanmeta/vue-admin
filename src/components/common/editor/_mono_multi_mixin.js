export default{
    props:{
        isMonoValid:{
            type:[Boolean,Function],
            default(){
                return true;
            },
        },
    },
    computed:{
        model:{
            get(){
                if(this.isMonoValid(this.value)){
                    return [this.value]
                }
                return [];
            },
            set(val){
                this.$emit('input',val[val.length-1])
            },
        },
    },
}