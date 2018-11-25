export default{
    functional:true,
    props:{
        label:{
            type:String,
        },
    },
    render(h,{props,slots}){
        const slotComponent = slots().default;
        if(slotComponent){
            return slotComponent;
        }else{
            return (
                <span>{props.label}</span>
            )
        }
    },
}