import _props_candidate_mixin from '../Editors/_props_candidate_mixin';
import _props_label_value_mixin from '../Editors/_props_label_value_mixin';

export default {
    mixins: [
        _props_candidate_mixin,
        _props_label_value_mixin,
    ],
    props: {
        allvalue: {
            default: '',
        },
        alllabel: {
            type: String,
            default: '不限',
        },
    },
    computed: {
        filter_candidate () {
            const [
                ...arr
            ] = this.candidate;
            arr.unshift({
                [this.labelfield]: this.alllabel,
                [this.valuefield]: this.allvalue,
            });
            return arr;
        },
    },
};
