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
                    <td>
                        <slot name="label" :field="field"></slot>
                    </td>
                    <td
                        :colspan="(field_list[field].colspan && field_list[field].colspan[mode]) || 1"
                    >
                        <slot :field="field"></slot>
                    </td>
                </template>
                <td
                    v-if="restCols[rowIndex]"
                    :colspan="restCols[rowIndex]"
                ></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
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
        maxCol(){
            let max = 2;
            for(let row of this.fields){
                let rowCol = 0;
                for(let field of row){
                    rowCol += ( ( (this.field_list[field].colspan && this.field_list[field].colspan[this.mode]) || 1) + 1 );
                }
                if(rowCol>max){
                    max = rowCol;
                }
            }

            return max;
        },
        restCols(){
            let arr = [];
            const max = this.maxCol;
            for(let row of this.fields){
                let rowCol = 0;
                for(let field of row){
                    rowCol += ( ( (this.field_list[field].colspan && this.field_list[field].colspan[this.mode]) || 1) + 1 );
                }
                arr.push(max - rowCol);
            }
            return arr;
        },
    },
}
</script>