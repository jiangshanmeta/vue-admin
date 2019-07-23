export default function getNeedInjectOperatorComponentsList (operators) {
    return operators.filter(item => item.component);
}
