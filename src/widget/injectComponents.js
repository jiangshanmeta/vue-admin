export default function injectComponents (vm, components) {
    if (!Array.isArray(components)) {
        components = Object.keys(components).map((field) => {
            return {
                name: components[field].name,
                component: components[field].component,
            };
        });
    }
    components.forEach((item) => {
        vm.$options.components[item.name] = item.component;
    });

    const dynamicImportComponents = components.filter(({
        component, 
    }) => {
        return typeof component === 'function' && !component.cid;
    }).map(({
        component, name, 
    }) => {
        return component().then((realComponent) => {
            vm.$options.components[name] = realComponent;
        });
    });
    return Promise.all(dynamicImportComponents);
}
