export default{
    name:"view_html",
    functional:true,
    props:{
        data:{
            type:String,
            required:true
        }
    },
    render(h,{props}){
        return h('div',{
            domProps:{
                innerHTML:props.data
            }
        });
    },
}
