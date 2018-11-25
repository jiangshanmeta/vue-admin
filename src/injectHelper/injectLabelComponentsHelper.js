export default function(field_list,keys,type){
    return keys.reduce((obj,field)=>{
        const configLabelComponent = field_list[field].labelComponent;
        if(configLabelComponent){
            if(configLabelComponent[type]){
                obj[field] = configLabelComponent[type]
            }else if(configLabelComponent.default){
                const exclude = configLabelComponent.default.exclude;
                if(!Array.isArray(exclude) || !exclude.includes(type)){
                    obj[field] = configLabelComponent.default
                }
            }
        }
        return obj;
    },{});
}