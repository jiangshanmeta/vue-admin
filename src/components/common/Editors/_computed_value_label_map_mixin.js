import _props_label_value_mixin from './_props_label_value_mixin';

export default {
    mixins: [
        _props_label_value_mixin,
    ],
    computed: {
        valueLabelMap () {
            const {
                valuefield,
                labelfield,
            } = this;
            return this.candidate.reduce((map, item) => {
                return map.set(item[valuefield], item[labelfield]);
            }, new Map());
        },
    },
};
