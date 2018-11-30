<template>
    <table
        class="table"
    >
        <tbody>
            <tr
                v-for="(row,rowIndex) in fields"
                :key="rowIndex"
            >
                <template 
                    v-for="field in row"
                >
                    <td :colspan="colspanMapByField[field].label">
                        <slot name="label" :field="field"></slot>
                    </td>
                    <td
                        :colspan="colspanMapByField[field].field"
                    >
                        <slot :field="field"></slot>
                    </td>
                </template>
                <td
                    v-if="restCols[rowIndex]>0"
                    :colspan="restCols[rowIndex]"
                ></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
const defaultColspan = {
    label:1,
    field:1,
};

export default{
    props:{
        fields:{
            type:Array,
            required:true,
        },
        mode:{
            type:String,
            required:true,
        },
        field_list:{
            type:Object,
            required:true,
        }
    },
    computed:{
        colspanMapByField(){
            return Object.keys(this.field_list).reduce((obj,field)=>{
                let colspan = defaultColspan;
                const configColspan = this.field_list[field].colspan;
                if(configColspan){
                    if(configColspan[this.mode]){
                        colspan = configColspan[this.mode];
                    }else if(configColspan.default){
                        colspan = configColspan.default;
                        if(typeof configColspan.default === 'object'){
                            const exclude = configColspan.default.exclude;
                            if(Array.isArray(exclude) && exclude.includes(this.mode)){
                                colspan = defaultColspan;
                            }

                        }
                    }

                    if(typeof colspan !== 'object'){
                        colspan = {
                            label:1,
                            field:colspan,
                        }
                    }
                }

                obj[field] = colspan;
                return obj;
            },Object.create(null));
        },
        rowColspans(){
            return this.fields.map((row)=>{
                return row.reduce((count,field)=>{
                    const colspanConfig = this.colspanMapByField[field];
                    return count + colspanConfig.label + colspanConfig.field;
                },0);
            });
        },
        maxCol(){
            return Math.max(...this.rowColspans);
        },
        restCols(){
            return this.rowColspans.map((colspan)=>{
                return this.maxCol - colspan;
            });
        },
    },
}
</script>