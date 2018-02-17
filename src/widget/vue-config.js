export default {
    install(Vue){
        // mixin的时候会用到
        Vue.config.optionMergeStrategies.config = Vue.config.optionMergeStrategies.computed;

        Vue.mixin({
            beforeCreate:function(){
                const config = this.$options.config;
                if(config && typeof config === 'object'){
                    let keys = Object.keys(config);
                    keys.forEach((key)=>{
                        Object.defineProperty(this,key,{
                            value:config[key]
                        })
                    })
                }
            }
        })
    }
}