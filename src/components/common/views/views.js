export default{
    functional:true,
    render(h,{props,data}){
        let info = props.record[props.field];
        
        if(props.descriptor.view){
            let config = props.descriptor.view.config || {};
            if(props.descriptor.view.component){
                return data.scopedSlots.default({
                    data:info,
                    ...config,
                })
            }else if(props.descriptor.view.function){
                return (
                    <span>
                        {props.descriptor.view.function(info,config)}
                    </span>
                )
            }
        }else{
            return (
                <span>{info}</span>
            )
        }
    },
    props:{
        descriptor:{
            type:Object,
            required:true,
        },
        record:{
            type:Object,
            required:true,
        },
        field:{
            type:String,
            required:true,
        },
    }
}