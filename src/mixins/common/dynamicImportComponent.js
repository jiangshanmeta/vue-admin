export default{
    methods:{
        dynamicImportComponent(componentsPath=[]){
            return Promise.all(componentsPath.map((item)=>{
                return import("@/"+item)
            })).then((components)=>{
                components.forEach((component)=>{
                    this.$options.components[component.name] = component;
                })
            })
        },
    }
}