export default{
    computed:{
        valueLabelMap(){
            let valuefield = this.valuefield;
            let labelfield = this.labelfield;
            return this.candidate.reduce((map,item)=>{
                map.set(item[valuefield],item[labelfield]);
                return map;
            },new Map());
        },
    },
}