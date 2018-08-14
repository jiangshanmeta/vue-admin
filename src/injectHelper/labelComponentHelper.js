export default function filterLabelComponents(field_list,keys,type){
    const list = keys.reduce((arr,field)=>{
        const configLabelComponent = field_list[field].labelComponent;
        let finalLabelComponent;
        if(configLabelComponent){
            if(configLabelComponent[type]){
                finalLabelComponent = configLabelComponent[type];
            }else{
                const defaultLabelComponent = configLabelComponent.default;
                if(defaultLabelComponent){
                    const exclude = defaultLabelComponent.exclude;
                    if(Array.isArray(exclude)){
                        if(!exclude.includes(type)){
                            finalLabelComponent = defaultLabelComponent
                        }
                    }else{
                        finalLabelComponent = defaultLabelComponent;
                    }
                }

            }
        }

        if(finalLabelComponent){
            arr.push({
                field,
                name:finalLabelComponent.name,
                component:finalLabelComponent.component,
                config:finalLabelComponent.config,
            })
        }
        return arr;
    },[]);

    const map = list.reduce((obj,item)=>{
        obj[item.field] = item;
        return obj;
    },Object.create(null));

    return {
        list,
        map,
    }
}