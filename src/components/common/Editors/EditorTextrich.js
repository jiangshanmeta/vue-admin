import {
    quillEditor,
} from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default {
    name: 'EditorTextrich',
    functional: true,
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    render (h, context) {
        return (
            <quillEditor
                {...context.data}
            />
        );
    },
};
