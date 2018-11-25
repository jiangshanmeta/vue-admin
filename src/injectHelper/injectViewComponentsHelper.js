export default function(field_list,keys){
    return keys.reduce((obj,field)=>{
        const view = field_list[field].view;
        if(view && view.component){
            obj[field] = {
                name:view.name,
                component:view.component,
            }
        }
        return obj;
    },{});
}