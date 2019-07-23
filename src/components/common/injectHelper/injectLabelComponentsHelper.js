function getLabelMapByMode (fields, keys, mode) {
    return keys.reduce((obj, field) => {
        const configLabel = fields[field].label;
        if (configLabel) {
            if (configLabel[mode]) {
                obj[field] = configLabel[mode];
            } else if (configLabel.default) {
                const exclude = configLabel.default.exclude;
                if (!Array.isArray(exclude) || !exclude.includes(mode)) {
                    obj[field] = configLabel.default;
                }
            }
        }
        return obj;
    }, {});
}

function getNeedInjectLabelComponentsList (labelMap) {
    return Object.keys(labelMap).reduce((list, field) => {
        if (labelMap[field].component) {
            list.push({
                name: field,
                component: labelMap[field].component,
            });
        }
        return list;
    }, []);
}

export {
    getLabelMapByMode,
    getNeedInjectLabelComponentsList,
};
