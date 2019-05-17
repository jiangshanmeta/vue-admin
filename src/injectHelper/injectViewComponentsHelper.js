export default function getNeedInjectViewComponentsMap (field_list, keys) {
    return keys.reduce((obj, field) => {
        const view = field_list[field].view
        if (view && view.component) {
            obj[field] = view
        }
        return obj
    }, {})
}
