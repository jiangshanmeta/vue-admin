export default {
    props: {
        idfield: {
            type: String,
            default: 'id',
        },
    },
    computed: {
        id () {
            return this.data[this.idfield];
        },
    },
};
