export default{
    computed:{
        id(){
            return this.data[this.config['idfield'] || 'id'];
        }
    }
}