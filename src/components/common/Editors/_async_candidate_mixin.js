import {
    logError,
} from '@/widget/utility';

export default {
    data () {
        return {
            candidate: [],
            isRequest: false,
        };
    },
    props: {
        getCandidate: {
            type: Function,
            required: true,
        },
    },
    created () {
        this.getCandidate().then((candidate) => {
            this.isRequest = false;
            this.candidate = Object.freeze(candidate);
        }).catch(logError);
    },
};
