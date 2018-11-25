export default {
    install(Vue,options={key:['config']}){

        // 添加key参数，可以配置名称，支持多个config参数(更加语义化)

        // mixin的时候会用到
        options.key.forEach((key)=>{
            Vue.config.optionMergeStrategies[key] = Vue.config.optionMergeStrategies.computed;
        });

        Vue.mixin({
            beforeCreate(){
                options.key.forEach((optionKey)=>{
                    const config = this.$options[optionKey];
                    if(config && typeof config === 'object'){
                        let keys = Object.keys(config);
                        keys.forEach((key)=>{
                            Object.defineProperty(this,key,{
                                value:config[key],
                                writable:true,
                            })
                        })
                    }
                });
            }
        })
    }
}