export function observe_relates(relates,context){
    let keys = Object.keys(relates);
    keys.forEach(function(item){
        observe_item(relates[item],context)
    });

}

export function observe_item(item,context,field=item.relatefield){
    Object.defineProperty(item,'value',{
        get:function(){
            return context[field]
        },
        set:function(){

        },
        enumerable:true,
        configurable:true,
    });
}