export default{
    methods:{
        mergeAttrsConfig(config){
            if(!config || typeof config !== 'object'){
                return this.$attrs || {};
            }

            let target = {};
            if(this.$attrs && typeof this.$attrs === 'object'){
                let attrKeys = Object.keys(this.$attrs);
                attrKeys.forEach((key)=>{
                    let descriptor = Object.getOwnPropertyDescriptor(this.$attrs,key);
                    Object.defineProperty(target,key,descriptor);
                });
            }

            let configKeys = Object.keys(config);
            configKeys.forEach((key)=>{
                let descriptor = Object.getOwnPropertyDescriptor(config,key);
                Object.defineProperty(target,key,descriptor)
            });

            return target;
        }
    }
}