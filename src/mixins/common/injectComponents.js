const flagField = 'componentsInjected'

export default{
    data(){
        return {
            [flagField]:false,
        }
    },
    methods:{
        injectComponents(components){
            this[flagField] = false;
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
    },
}