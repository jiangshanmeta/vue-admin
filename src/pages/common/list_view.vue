<template>
<section>
    <slot name="beforeAll"></slot>
    <section>
        <create
            :field_list="field_list"
            v-bind="createConfig"
            @create="handleCreate"
        ></create>
        <slot name="afterCreate"></slot>
    </section>

    <slot name="beforeList"></slot>
    <list-info
        :field_list="field_list"
        :filters="filters"
        :operators="operators"
        v-bind="listConfig"
        ref="listInfo"
    >
        <template slot="filters" slot-scope="scope">
            <slot name="filters" :formData="scope.formData"></slot>
        </template>
        <template slot="afterFilters">
            <slot name="afterFilters"></slot>
        </template>
    </list-info>
    <slot name="afterAll"></slot>
</section>
</template>

<script>
import create from "@/components/common/staticOperators/create.vue"
import listInfo from "@/components/common/listInfo.vue"


export default{
    inheritAttrs:true,
    components:{
        create,
        listInfo,
    },
    props:{
        field_list:{
            type:Object,
            default:function(){
                return {};
            }
        },
        createConfig:{
            type:Object,
            default:function(){
                return {}
            }
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
        }
    },
    methods:{
        handleCreate(){
            this.$refs.listInfo && this.$refs.listInfo.getListInfo();
        }
    }
}

</script>