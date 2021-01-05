import UploadList from './UploadList';
import Upload from './Upload';
import _listeners_without_input_mixin from '../_listeners_without_input_mixin';

function identity (val) {
    return val;
}

export default {
    components: {
        UploadList,
        Upload,
    },
    mixins: [
        _listeners_without_input_mixin,
    ],
    props: {
        value: {
            type: [
                String, Object, Array,
            ],
            required: true,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
        limit: {
            type: Number,
            default: Infinity,
        },
        // 上传组件专用
        drag: {
            type: Boolean,
            default: false,
        },
        accept: {
            type: String,
            default: '',
        },
        filename: {
            type: String,
            default: 'file',
        },
        headers: {
            type: Object,
            default: null,
        },
        withCredentials: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: null,
        },
        action: {
            type: String,
            default: '',
        },
        httpRequest: {
            type: Function,
        },
        getValueFromResponse: {
            type: Function,
            default: identity,
        },
        onError: {
            type: Function,
        },

        // 列表组件专用
        onPreview: {
            type: Function,
        },
        listType: {
            type: String,
            default: 'text',
        },
        getImageUrl: {
            type: Function,
        },
        getFileName: {
            type: Function,
        },

        onRemove: {
            type: Function,
            default (file, index) {
                return Promise.resolve();
            },
        },
    },
    computed: {
        model: {
            get () {
                if (Array.isArray(this.value)) {
                    return this.value;
                }
                return this.value
                    ? [
                        this.value,
                    ]
                    : [];
            },
            set (val) {
                const emitVal = Array.isArray(this.value) ? val : (val[0] ? val[0] : '');
                console.log(emitVal);
                this.$emit('input', emitVal);
            },
        },
        uploadListComponentProp () {
            return {
                files: this.model,
                disabled: this.disabled,
                onPreview: this.onPreview,
                listType: this.listType,
                getImageUrl: this.getImageUrl,
                getFileName: this.getFileName,
            };
        },
        uploadComponentProp () {
            // TODO
            return {
                drag: this.drag,
                disabled: this.disabled,
                accept: this.accept,
                filename: this.filename,
                headers: this.headers,
                withCredentials: this.withCredentials,
                data: this.data,
                action: this.action,
                httpRequest: this.httpRequest,
                onSuccess: this.onSuccess,
                // onProgress onError 在这里没意义
            };
        },

    },
    methods: {
        onSuccess (val) {
            const value = [
                ...this.model,
            ];
            value.push(this.getValueFromResponse(val));
            this.model = value;
        },
        handleRemove (file, index) {
            console.log('remove');
            this.onRemove(file, index).then(() => {
                const value = [
                    ...this.model,
                ];
                // 考虑到onRemove是异步的，并且会同时有多个删除 所以要重新确定索引
                const newIndex = this.model.indexOf(file);
                if (newIndex > -1) {
                    value.splice(newIndex, 1);
                }
                this.model = value;
            }).catch(() => {});
        },
    },
    render (h) {
        return (
            <div>
                <UploadList
                    {...{
                        props: this.uploadListComponentProp,
                    }}
                    on-remove={this.handleRemove}
                />

                {
                    this.limit > this.model.length
                        ? <Upload
                            {...{
                                props: this.uploadComponentProp,
                            }}
                        >{this.$slots.default}</Upload>
                        : ''

                }
            </div>
        );
    },
};
