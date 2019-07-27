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
            return [
                {
                    [this.labelfield]: this.alllabel,
                    [this.valuefield]: this.allvalue,
                },
                ...this.candidate,
            ];
        },
    },
};
