export default function getNeedInjectEditorComponentsList (fields, keys) {
    return keys
        .filter(field => fields[field].editorComponent && fields[field].editorComponent.component)
        .map(field => fields[field].editorComponent);
}
