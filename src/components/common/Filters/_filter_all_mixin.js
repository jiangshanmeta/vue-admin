import _candidate_mixin from '../Editors/_candidate_mixin';

export default {
    mixins: [
        _candidate_mixin,
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
