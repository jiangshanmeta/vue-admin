export default function getNeedInjectViewComponentsMap (fields, keys) {
    return keys.reduce((obj, field) => {
        const view = fields[field].view;
        if (view && view.component) {
            view.name = field;
            obj[field] = view;
        }
        return obj;
    }, {});
}
