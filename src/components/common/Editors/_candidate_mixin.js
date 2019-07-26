import _props_label_value_mixin from './_props_label_value_mixin';

export default {
    mixins: [
        _props_label_value_mixin,
    ],
    props: {
        candidate: {
            type: Array,
            required: true,
        },
    },
};
