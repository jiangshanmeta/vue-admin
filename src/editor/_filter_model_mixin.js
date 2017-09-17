export default{
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