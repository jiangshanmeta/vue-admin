import ajax from './ajax';
import UploadDragger from './UploadDragger';

export default {
    components: {
        UploadDragger,
    },
    props: {
        drag: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
        accept: {
            type: String,
            default: '',
        },

        // 上传相关
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
            default: ajax,
        },
        onProgress: {
            type: Function,
        },
        onSuccess: {
            type: Function,
            required: true,
        },
        onError: {
            type: Function,
        },
    },
    methods: {
        handleClick () {
            if (!this.disabled) {
                this.$refs.input.value = null;
                this.$refs.input.click();
            }
        },
        handleChange (ev) {
            const file = ev.target.files[0];
            if (!file) {
                return;
            }

            this.uploadFile(file);
        },

        uploadFile (file) {
            if (!file) {
                return;
            }
            const options = {
                headers: this.headers,
                withCredentials: this.withCredentials,
                file,
                data: this.data,
                filename: this.filename,
                action: this.action,
                onProgress: e => {
                    this.onProgress && this.onProgress(e);
                },
                onSuccess: res => {
                    this.onSuccess(res, file);
                },
                onError: err => {
                    this.onError && this.onError(err, file);
                },
            };
            this.httpRequest(options);
        },
    },
    render (h) {
        const {
            filename,
            accept,
            drag,
            uploadFile,
            disabled,
            handleChange,
            handleClick,
        } = this;

        const data = {
            class: {
                'el-upload': true,
            },
            on: {
                click: handleClick,
            },
        };
        return (
            <div {...data} tabindex="0">
                {
                    drag
                        ? <UploadDragger
                            accept={accept}
                            disabled={disabled}
                            on-file={uploadFile}
                        >{this.$slots.default}</UploadDragger>
                        : this.$slots.default
                }
                <input
                    class="el-upload__input"
                    type="file"
                    ref="input"
                    name={filename}
                    on-change={handleChange}
                    multiple={false}
                    accept={accept}
                />
            </div>
        );
    },
};
