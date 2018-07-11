import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Props_value_number_mixin extends Vue{
    @Prop({
        type:Number,
        required:true,
    }) value!: number;
}