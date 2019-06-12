export default function getNeedInjectEditorComponentsList (fields, keys) {
    return keys
        .filter(field => fields[field].editor && fields[field].editor.component)
        .map(field => fields[field].editor);
}
