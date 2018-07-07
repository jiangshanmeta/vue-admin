import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Computed_model_mixin extends Vue{
    @Prop() value: any;
    get model(): any{
        return this.value;
    }
    set model(val){
        this.$emit("input",val)
    }
}