export function observe_relates (relates, context) {
    relates.forEach(function (item) {
        if (item.relateField && typeof item.relateField !== 'object') {
            observe_item(item, context);
        }
    });
}

export function observe_item (item, context, field = item.relateField) {
    Object.defineProperty(item, 'value', {
        get: function () {
            return context[field];
        },
        set: function () {

        },
        enumerable: true,
        configurable: true,
    });
}
