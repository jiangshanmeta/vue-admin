export default{
    methods:{
        // dynamicImportComponent(componentsPath=[]){
        //     return Promise.all(componentsPath.map((item)=>{
        //         let path = typeof item === 'object'?item.path:item;
        //         return import("@/"+path);
        //     })).then((components)=>{
        //         components.forEach((component,index)=>{
        //             let name;
        //             if( (typeof componentsPath[index] === 'object') && componentsPath[index].name){
        //                 name = componentsPath[index].name;
        //             }else{
        //                 name = component.name;
        //                 if(name === undefined){
        //                     name = componentsPath[index].split("/").pop().split(".")[0]
        //                 }
        //             }
                    
        //             this.$options.components[name] = component;
        //         })
        //     })
        // },
    }
}