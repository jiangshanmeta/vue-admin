export default {
    data(){
        return {
            currentValue:'',
        }        
    },
    props:{
        value:{
            required:true,
        },
    },
    methods:{
        handleChange(newVal=''){
            this.$emit('input',newVal)
        }
    },
    watch:{
        value:{
            immediate:true,
            handler(newVal){
                this.currentValue = newVal
            }
        }
    },
}