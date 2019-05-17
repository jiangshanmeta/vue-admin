export default function getNeedInjectFilterComponentsList (filters) {
    return filters
        .filter(item => item.editorComponent.component)
        .map(item => item.editorComponent)
}
