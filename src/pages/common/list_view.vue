<template>
<section>
    <slot name="beforeAll"></slot>

    <list-info
        :field_list="field_list"
        :filters="filters"
        :operators="operators"
        :filterOperators="filterOperators"
        :name="name"
        v-bind="listConfig"
        ref="listInfo"
    >
        <template slot="beforeFilters" slot-scope="scope">
            <operators
                :operators="staticOperators"
                v-bind="scope"
                :field_list="field_list"
                @update="refreshListData"
                style="margin-bottom:8px;"
            ></operators>
        </template>

        <template slot="afterFilters" slot-scope="scope">
            <slot 
                name="afterFilters" 
                v-bind="scope"
            ></slot>
        </template>
    </list-info>
    <slot name="afterAll"></slot>
</section>
</template>

<script>
export default{
    inheritAttrs:true,
    components:{
        listInfo:()=>import("@/components/common/listInfo"),
        operators:()=>import("@/components/common/operators/operators"),
    },
    props:{
        field_list:{
            type:Object,
            default:function(){
                return {};
            }
        },
        staticOperators:{
            type:Array,
            default:function(){
                return [];
            },
        },
        filters:{
            type:Array,
            default:function(){
                return [];
            }
        },
        listConfig:{
            type:Object,
            default:function(){
                return {};
            },
        },
        operators:{
            type:Array,
            default:function(){
                return [];
            }
        },
        filterOperators:{
            type:Array,
            default:function(){
                return [];
            }
        },
        name:{
            type:String,
            default:"",
        },
    },
    methods:{
        refreshListData(){
            this.$refs.listInfo && this.$refs.listInfo.getListInfo();
        }
    }
}

</script>