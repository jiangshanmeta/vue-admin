export default{
    functional:true,
    render(h,{props,data}){
        let info = props.record[props.field];
        
        if(props.descriptor.view){
            let config = props.descriptor.view.config || {};
            let isJoinField = false;
            if(typeof props.descriptor.view.join === 'object'){
                isJoinField = true;
                if(Array.isArray(props.descriptor.view.join)){
                    info = props.descriptor.view.join.reduce((obj,field)=>{
                        obj[field] = props.record[field];
                        return obj;
                    },{});
                }else{
                    info = Object.keys(props.descriptor.view.join).reduce((obj,originalField)=>{
                        obj[props.descriptor.view.join[originalField]] = props.record[originalField];
                        return obj;
                    },{});
                }
            }
            if(props.descriptor.view.component){
                let scopedSlotsData;
                if(isJoinField){
                    scopedSlotsData = {
                        ...info,
                        ...config
                    }
                }else{
                    scopedSlotsData = {
                        data:info,
                        ...config,
                        record:props.record,
                    }
                }
                return data.scopedSlots.default(scopedSlotsData)
            }else if(props.descriptor.view.function){
                return (
                    <span>
                        {props.descriptor.view.function(info,config,props.record)}
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