export default{
    functional:true,
    props:{
        title:{
            required:true,
        },
    },
    render(h,{props}){
        document.title = props.title;
        return null;
    }
}