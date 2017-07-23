let formHelper = {
    methods:{
        _asyncProp(childField='currentValue',propName='value'){
            this.$watch(propName,function(newVal){
                if(newVal !== this[childField]){
                    this[childField] = newVal;
                }
            })
        },
        _notifyInput(field){
            this.$watch(field,function(newVal){
                this.$emit('input',newVal);
            })
        },
        // _asyncInput(){

        // }
    },
}

export {
    formHelper
}