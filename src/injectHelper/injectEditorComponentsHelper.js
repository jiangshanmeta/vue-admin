export default function getNeedInjectEditorComponentsList (field_list, keys) {
    return keys
        .filter(field => field_list[field].editorComponent && field_list[field].editorComponent.component)
        .map(field => field_list[field].editorComponent)
}
