import isPromise from 'is-promise'

const assets = ['component','directive','filter'];

const prefix = 'async$';

import {ucfirst} from "./helper"

function nomalizeAssetOption(assetOption,asset){
    if(!Array.isArray(assetOption)){
        assetOption = Object.keys(assetOption).map((name)=>{
            return {
                [asset]:assetOption[name],
                name,
            }
        });
    }

    assetOption.forEach((item,index,array)=>{

        if(isPromise(item)){
            array[index] = {
                [asset]:item,
                name:index,
            }
        }

        if(!item.hasOwnProperty('name')){
            item.name = index;
        }
    });


    return assetOption;
}

export default function(Vue){

    Vue.mixin({
        created(){
            assets.forEach((asset)=>{
                this['$resetAsync' + ucfirst(asset)](this.$options['async' + ucfirst(asset)])
            });
        },
    });

    assets.forEach((asset)=>{
        Object.defineProperty(Vue.prototype,'$resetAsync' + ucfirst(asset),{
            value(assetOption){
                if(!assetOption || typeof assetOption !== 'object'){
                    return;
                }

                this[prefix + asset] = {
                    $all:false,
                }

                assetOption = nomalizeAssetOption(assetOption,asset);

                assetOption.forEach((item)=>{
                    this.$set(this[prefix + asset],item.name,false);

                    item[asset].then((rst)=>{
                        this.$options[asset + 's'][item.name] = rst;
                        this[prefix + asset][item.name] = true;
                    })
                });

                return Promise.all(assetOption.map((item)=>{
                    return item[asset];
                })).then(()=>{
                    this[prefix + asset].$all = true;
                });

            },
        });

    });
}