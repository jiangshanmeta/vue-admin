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
        new Promise((resolve) => {
            this.isRequest = true;
            this.getCandidate(resolve);
        }).then((candidate) => {
            this.isRequest = false;
            this.candidate = Object.freeze(candidate);
        }).catch(logError);
    },
};
