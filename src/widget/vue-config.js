export default {
    // 添加key参数，可以配置名称，支持多个config参数(更加语义化)
    install(Vue,options={key:['config']}){
        
        // mixin的时候会用到
        options.key.forEach((key)=>{
            Vue.config.optionMergeStrategies[key] = Vue.config.optionMergeStrategies.computed;
        });

        Vue.mixin({
            beforeCreate(){
                options.key.forEach((optionKey)=>{
                    const config = this.$options[optionKey];
                    if(!config || typeof config !== 'object'){
                        return;
                    }
                    let keys = Object.keys(config);
                    keys.forEach((key)=>{
                        const descriptor = Object.getOwnPropertyDescriptor(config,key)
                        if(descriptor.get){
                            Object.defineProperty(this,key,{
                                get:descriptor.get,
                            });
                        }else{
                            Object.defineProperty(this,key,{
                                value:config[key],
                                writable:true,
                            })
                        }
                    })
                });
            }
        })
    }
}