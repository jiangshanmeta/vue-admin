import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Props_value_mixin extends Vue{
    @Prop() value: any;
}