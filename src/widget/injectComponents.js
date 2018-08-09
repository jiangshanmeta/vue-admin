export default function injectComponents(vm,components){
    if(!Array.isArray(components)){
        components = Object.keys(components).map((name)=>{
            return {
                name,
                component:components[name],
            };
        })
    }

    components.forEach((item)=>{
        vm.$options.components[item.name] = item.component;
    });

    const dynamicImportComponents = components.filter(({component})=>{
        return typeof component === 'function' && !component.cid;
    }).map(({component,name})=>{
        return component().then((realComponent)=>{
            vm.$options.components[name] = realComponent
        });
    });

    return Promise.all(dynamicImportComponents);
}