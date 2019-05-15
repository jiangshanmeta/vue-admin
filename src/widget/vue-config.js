export default {
    install(Vue,{optionKeys=['config']}={}){

        optionKeys.forEach((optionKey)=>{
            Vue.config.optionMergeStrategies[optionKey] = Vue.config.optionMergeStrategies.computed;
        });

        Vue.mixin({
            beforeCreate(){
                optionKeys.forEach((optionKey)=>{
                    const config = this.$options[optionKey];
                    if(!config || typeof config !== 'object'){
                        return;
                    }
                    Object.keys(config).forEach((key)=>{
                        const descriptor = Object.getOwnPropertyDescriptor(config,key)
                        
                        if(descriptor.get){
                            // support getter
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