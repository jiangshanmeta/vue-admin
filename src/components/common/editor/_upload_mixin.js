export default{
    props:{
        uri:{
            type:String,
            required:true,
        },
        labelfield:{
            type:String,
            default:"name",
        },
        valuefield:{
            type:String,
            default:"url",
        }
    },
    computed:{
        model:{
            get(){
                const labelfield = this.labelfield;
                const valuefield = this.valuefield;
                return this.value.map((item)=>{
                    let target = Object.assign({},item);
                    target['name'] = target[labelfield];
                    target['url'] = target[valuefield];
                    return target
                })

            },
            set(value){
                this.$emit('input',value);
            }
        }
    },
    methods:{
        handleSuccess(response,file,fileList){
            let [...newArr] = this.value;
            newArr.push(response.data);
            this.model = newArr;
        },
        handlePreview(file){
            window.open(file.url)
        },
        handleRemove(file){
            let valuefield = this.valuefield;
            let url = file.url;
            let index = this.value.findIndex((item)=>{
                return item[valuefield] === url
            });

            let [...newArr] = this.value;
            newArr.splice(index,1);
            this.model = newArr;
        }
    },
}