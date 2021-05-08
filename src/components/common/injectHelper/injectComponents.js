export default function injectComponents (components, target) {
    if (!Array.isArray(components)) {
        components = Object.keys(components).map((field) => {
            return {
                name: components[field].name,
                component: components[field].component,
            };
        });
    }
    components.forEach((item) => {
        target[item.name] = item.component;
    });

    const dynamicImportComponents = components.filter(({
        component,
    }) => {
        return typeof component === 'function' && !component.cid;
    }).map(({
        component, name,
    }) => {
        return component().then((realComponent) => {
            target[name] = realComponent.default ? realComponent.default : realComponent;
        });
    });
    return Promise.all(dynamicImportComponents);
}
