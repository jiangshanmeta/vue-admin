import asyncPlugin from "./async-plugin"
import asyncAssets from "./async-assets"

import {prefix} from "./consts"
import {ucfirst} from "./helper"

const assets = ['plugin','component','directive','filter'];

export default{
    install(Vue){

        Vue.mixin({
            beforeCreate(){
                const optionData = this.$options.data || {};
                this.$options.data = function(){
                    let data = typeof optionData === 'function'?optionData.call(this):optionData;

                    assets.forEach((asset)=>{
                        data[prefix + asset] = {};
                    });

                    return data;
                }
            },
        });


        assets.forEach((asset)=>{
            Object.defineProperty(Vue.prototype,'$async' + ucfirst(asset),{
                get(){
                    return this[prefix + asset];
                },
            });
        })

        asyncPlugin(Vue);
        asyncAssets(Vue);
    },
}