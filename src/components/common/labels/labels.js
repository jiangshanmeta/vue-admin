export default{
    functional:true,
    props:{
        label:{
            type:String,
        },
        labelComponent:{
            type:Object,
        },
    },
    render(h,{props,slots}){
        if(props.labelComponent && props.labelComponent){
            return slots().default;
        }else{
            return (
                <span>{props.label}</span>
            )
        }
    },
}