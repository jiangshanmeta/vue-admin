function identity (value) {
    return value;
}

export default {
    name: 'Views',
    functional: true,
    props: {
        view: {
            type: Object,
        },
        record: {
            type: Object,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        component: {
            type: [
                Function, Object,
            ],
            default: null,
        },
    },
    render (h, {
        props, parent,
    }) {
        let info = props.record[props.field];

        if (props.view) {
            const {
                config = {},
                join,
                handler,
                getViewValue = identity,
            } = props.view;

            const component = props.component;

            const isJoinField = join && (typeof join === 'object');
            if (isJoinField) {
                const obj = props.record.hasOwnProperty(props.field) ? {
                    [props.field]: info,
                } : {};
                if (Array.isArray(join)) {
                    info = join.reduce((obj, field) => {
                        obj[field] = props.record[field];
                        return obj;
                    }, obj);
                } else {
                    info = Object.keys(join).reduce((obj, originalField) => {
                        obj[join[originalField]] = props.record[originalField];
                        return obj;
                    }, obj);
                }
            }
            // parent 是为了绑定this指向 可能会访问$store或者原型对象上的属性
            info = getViewValue.call(parent, info);

            if (component) {
                const propsData = isJoinField
                    ? {
                        ...info,
                        ...config,
                    }
                    : {
                        data: info,
                        ...config,
                    };
                // vue的jsx 如果需要展开对象 需要用vue-data-object的形式 坑
                return (
                    <component
                        {...{
                            props: propsData,
                        }}
                    />
                );
            } else if (handler) {
                // parent 是为了绑定this指向 可能会访问$store或者原型对象上的属性
                return (
                    <span>
                        {handler.call(parent, info, config)}
                    </span>
                );
            }
        } else {
            return (
                <span>{info}</span>
            );
        }
    },
};
