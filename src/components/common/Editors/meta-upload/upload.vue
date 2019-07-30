<script>
/* eslint-disable  */
import ajax from './ajax'
import UploadDragger from './upload-dragger'

export default {
    inject: ['uploader',],
    components: {
        UploadDragger,
    },
  	props: {
    	type: String,
    	action: {
            type: String,
            required: true,
    	},
        name: {
            type: String,
            default: 'file',
        },
    	data: Object,
    	headers: Object,
    	withCredentials: Boolean,
    	multiple: Boolean,
    	accept: String,
    	onStart: Function,
    	onProgress: Function,
    	onSuccess: Function,
    	onError: Function,
    	drag: Boolean,
        onPreview: {
            type: Function,
            default: function () {},
        },
    	fileList: Array,
    	autoUpload: Boolean,
    	listType: String,
        httpRequest: {
            type: Function,
            default: ajax,
        },
    	disabled: Boolean,
    	limit: Number,
    	onExceed: Function,
  	},
    data () {
        return {
            reqs: {},
        }
    },
  	methods: {
        handleChange (ev) {
            const files = ev.target.files

            if (!files) return
            this.uploadFiles(files)
        },
        uploadFiles (files) {
            if (this.limit && this.fileList.length + files.length > this.limit) {
                this.onExceed && this.onExceed(files, this.fileList)
                return
            }

      		let postFiles = Array.from(files)
      		if (!this.multiple) { postFiles = postFiles.slice(0, 1) }

      		if (postFiles.length === 0) { return }

            postFiles.forEach(rawFile => {
                this.onStart(rawFile)
                if (this.autoUpload) this.upload(rawFile)
            })
    	},
    	upload (rawFile) {
      		this.$refs.input.value = null
            this.post(rawFile)
        },
        post (rawFile) {
            const { uid, } = rawFile
            const options = {
                headers: this.headers,
                withCredentials: this.withCredentials,
                file: rawFile,
                data: this.data,
                filename: this.name,
                action: this.action,
                onProgress: e => {
                    this.onProgress(e, rawFile)
                },
                onSuccess: res => {
                    this.onSuccess(res, rawFile)
                    delete this.reqs[uid]
                },
                onError: err => {
                    this.onError(err, rawFile)
                    delete this.reqs[uid]
                },
            }
            const req = this.httpRequest(options)
            this.reqs[uid] = req
            if (req && req.then) {
                req.then(options.onSuccess, options.onError)
            }
        },
        handleClick () {
            if (!this.disabled) {
                this.$refs.input.value = null
                this.$refs.input.click()
            }
        },
        handleKeydown (e) {
            if (e.target !== e.currentTarget) return
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.handleClick()
            }
        },
  	},

  	render (h) {
        let {
            handleClick,
            drag,
            name,
            handleChange,
            multiple,
            accept,
            listType,
            uploadFiles,
            disabled,
            handleKeydown,
        } = this
        const data = {
            class: {
                'el-upload': true,
            },
            on: {
                click: handleClick,
                keydown: handleKeydown,
            },
        }
    	data.class[`el-upload--${listType}`] = true
        return (
            <div {...data} tabindex="0" >
                {
                    drag
                        ? <upload-dragger
                            disabled={disabled}
                            on-file={uploadFiles}
                        >{this.$slots.default}</upload-dragger>
                        : this.$slots.default
                }
                <input
                    class="el-upload__input"
                    type="file"
                    ref="input"
                    name={name}
                    on-change={handleChange}
                    multiple={multiple}
                    accept={accept}
                />
            </div>
        )
  	},
}
</script>
