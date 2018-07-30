export default{
    functional:true,
    render(h,{props,data}){
        let info = props.record[props.field];
        
        if(props.descriptor.view){
            const {
                config={},
                join,
                component,
                handler,
            } = props.descriptor.view;

            let isJoinField = false;
            if(typeof join === 'object'){
                isJoinField = true;

                let obj = props.record.hasOwnProperty(props.field)?{[props.field]:info}:{};

                if(Array.isArray(join)){
                    info = join.reduce((obj,field)=>{
                        obj[field] = props.record[field];
                        return obj;
                    },obj);
                }else{
                    info = Object.keys(join).reduce((obj,originalField)=>{
                        obj[join[originalField]] = props.record[originalField];
                        return obj;
                    },obj);
                }

            }
            if(component){
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
                    }
                }
                return data.scopedSlots.default(scopedSlotsData)
            }else if(handler){
                return (
                    <span>
                        {handler(info,config)}
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