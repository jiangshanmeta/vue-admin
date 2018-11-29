export default{
    name:"view_html",
    functional:true,
    props:{
        data:{
            type:String,
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
