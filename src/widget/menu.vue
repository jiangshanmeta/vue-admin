<template>
<ul class="menu">
    <li    
        v-for="(item,index) in menu" 
        :key="index" 
        :class="{
            active:$store.state.uri.controller_name===item.controller_name,

            }"   
        >
        <a 
            @click="toggleMenu($event)" 
            class="menu-title"
            :class="{open:$store.state.uri.controller_name===item.controller_name}"
        >
            <i :class="'el-icon-'+item.icon" style="margin-right:5px;"></i>
            {{item.label}}
        </a>
        <ul v-if="item.children"   class="sub-menu" >
            <li v-for="(child,childIndex) in item.children" 
                :class="{active:$store.state.uri.controller_name===item.controller_name && $store.state.uri.method_name===child.method_name}"   
            >
                <router-link  
                    :to=" '/' +  item.controller_name +'/' +child.method_name" 
                    :key="childIndex">
                        <i :class="[$store.state.uri.controller_name===item.controller_name && $store.state.uri.method_name===child.method_name?'el-icon-arrow-right':'el-icon-minus']">
                        </i>
                        {{child.label}}
                </router-link>
            </li>
        </ul>
    </li>
</ul>
</template>

<script>
export default{
    data(){
        return {

        }
    },
    props:{
        menu:{
            type:Array,
            required:true,
        }
    },
    methods:{
        toggleMenu(event){
            let target = event.currentTarget;
            target.classList.toggle('open');
        }
    },

}
</script>

<style scoped>
.menu{
    width:235px;
    list-style:none;
    margin:0;
    padding:0;
    background-color:#3d3d3d;
}
.menu>li{
    display:block;
    margin:0;
    padding:0;
    border:0;
}
.menu>li>a{
    display:block;
    position:relative;
    margin:0;
    padding:10px 15px;
    border-top:1px solid #484848;
    color:#d9d9d9;
    text-decoration:none;
    font-size:14px;
    font-weight:300px;
}
.menu>li:hover>a{
    background:#303030;
    color:#d9d9d9;
}
.menu>li.active>a{
    background:#d64635;
    border-top-color:transparent;
    color:#fff;
}
.menu>li.active>a::after{
    content:'';
    position:absolute;
    right:0;
    top:8px;
    width:0;
    height:0;
    border-top:12px solid transparent;
    border-bottom:12px solid transparent;
    border-right:12px solid #fff;
}



.sub-menu{
    list-style:none;
    padding:0;
    margin:0;
}
.sub-menu>li{
    position:relative;
    display:block;
}
.sub-menu>li>a{
    display:block;
    padding:10px 15px 10px 40px;
    color:#e0e0e0;
    font-size:12px;
    text-decoration:none;
}
.sub-menu>li:hover>a{
    background-color:#555;
    color:#fff;
}


.sub-menu>li.active>a{
    color:#d64635;
    font-weight:bold;
    background:#444;
}

.menu-title+.sub-menu{
    height:0;
    transform:scale(1,0);
    transform-origin:top center;
}
.menu-title.open+.sub-menu{
    transform:scale(1,1);
    height:auto;
    transition:transform 0.3s ease;
}



</style>