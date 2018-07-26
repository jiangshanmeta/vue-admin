const flagField = 'components$Injected';

export default function(Vue){
    Object.defineProperty(Vue.prototype,'$injectComponents',{
        value(components){
            this[flagField] = false;
            // normalize成array的形式
            if(!Array.isArray(components)){
                components = Object.keys(components).reduce((arr,name)=>{
                    arr.push({
                        name,
                        component:components[name]
                    })
                    return arr;
                },[]);
            }

            components.forEach((item)=>{
                this.$options.components[item.name] = item.component;
            });

            const dynamicImportComponents = components.filter(({component})=>{
                // 排除Vue子类
                return typeof component === 'function' && !component.cid;
            }).map(({component,name})=>{
                return component().then((child)=>{
                    this.$options.components[name] = child
                })
            })

            return Promise.all(dynamicImportComponents).then(()=>{
                this[flagField] = true;
            })
            
        }
    })

    Vue.mixin({
        beforeCreate(){
            const optionData = this.$options.data || {};
            this.$options.data = function(){
                let data = typeof optionData === 'function'?optionData.call(this):optionData;

                data[flagField] = false;
                return data;
            }
        },
    });


    Object.defineProperty(Vue.prototype,'$componentsInjected',{
        get(){
            return this[flagField];
        }
    })


}