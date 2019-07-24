export default function getNeedInjectViewComponentsMap (fields, keys) {
    return keys.reduce((obj, field) => {
        const view = fields[field].view;
        if (view && view.component) {
            const viewClone = {
                ...view,
            };
            viewClone.name = field;
            obj[field] = viewClone;
        }
        return obj;
    }, {});
}
