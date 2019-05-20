export default function getNeedInjectLabelComponentsMap (fields, keys, type) {
    return keys.reduce((obj, field) => {
        const configLabelComponent = fields[field].labelComponent
        if (configLabelComponent) {
            if (configLabelComponent[type]) {
                obj[field] = configLabelComponent[type]
            } else if (configLabelComponent.default) {
                const exclude = configLabelComponent.default.exclude
                if (!Array.isArray(exclude) || !exclude.includes(type)) {
                    obj[field] = configLabelComponent.default
                }
            }
        }
        return obj
    }, {})
}
