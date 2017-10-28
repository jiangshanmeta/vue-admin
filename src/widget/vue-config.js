// https://cn.vuejs.org/v2/api/#vm-options
import Vue from 'vue'
Vue.mixin({
    beforeCreate:function(){
        const options = this.$options;
        const config = options.config;
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