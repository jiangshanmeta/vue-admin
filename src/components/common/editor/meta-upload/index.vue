<script>
/* eslint-disable  */
import UploadList from './upload-list'
import Upload from './upload'

function noop () {}

function identity (value) {
    return value
}

let uid = 1
function getUid () {
    return uid++
}

export default {
    name: 'MetaUpload',
    components: {
        UploadList,
        Upload,
    },
    provide () {
        return {
            uploader: this,
        }
    },
  	props: {
        value: {
            type: Array,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        headers: {
            type: Object,
            default () {
                return {}
            },
        },
    	data: {
            type:Object,
            default(){
                return {}
            },
        },
    	multiple: Boolean,
        name: {
            type: String,
            default: 'file',
        },
    	drag: Boolean,
    	withCredentials: Boolean,
        showFileList: {
            type: Boolean,
            default: true,
        },
    	accept: String,
        type: {
            type: String,
            default: 'select',
        },
        onRemove: {
            type: Function,
            default: noop,
        },
        onPreview: {
            type: Function,
        },
        onSuccess: {
            type: Function,
            default: noop,
        },

        onError: {
            type: Function,
            default: noop,
        },
        autoUpload: {
            type: Boolean,
            default: true,
        },
        listType: {
            type: String,
            default: 'text', // text,picture,picture-card
        },
   	 	httpRequest: Function,
        parseResponse: {
            type: Function,
            default: identity,
        },
    	disabled: Boolean,
    	limit: Number,
        onExceed: {
            type: Function,
            default: noop,
        },
  	},
    data () {
        const uploadFiles = this.value.map((item) => {
            return {
                status: 'success',
                url: item.url,
                uid: getUid(),
                original: item,
            }
        })
        return {
            uploadFiles: [],
        }
    },
    computed: {
        uploadSuccessOriginalData () {
            return this.uploadFiles
                .filter(item => item.status === 'success')
                .map(item => item.original)
        },
    },
    watch: {
        value () {
            let index = 0
            this.uploadFiles = this.uploadFiles.map(item => {
                if (item.status === 'success') {
                    const valueItem = this.value[index++]
                    item.url = valueItem.url
                    item.original = valueItem
                }
                return item
            })
        },
    },

  	methods: {
        handleStart (rawFile) {
            rawFile.uid = getUid()
            let file = {
                status: 'ready',
                name: rawFile.name,
                size: rawFile.size,
                percentage: 0,
                uid: rawFile.uid,
                raw: rawFile,
            }

            if (this.listType === 'picture-card' || this.listType === 'picture') {
                try {
                    file.url = URL.createObjectURL(rawFile)
                } catch (err) {
                    console.error('[Element Error][Upload]', err)
                    return
                }
            }

            this.uploadFiles.push(file)
        },
        handleProgress (ev, rawFile) {
            const file = this.getFile(rawFile)
            file.status = 'uploading'
            file.percentage = ev.percent || 0
        },
        handleSuccess (res, rawFile) {
            const file = this.getFile(rawFile)
            file.status = 'success'
            this.$set(file, 'original', this.parseResponse(res))
            console.log(this.uploadSuccessOriginalData)
            this.$emit('input', this.uploadSuccessOriginalData)
        },
        handleError (err, rawFile) {
            // 直接让用户重新选择上传得了，做啥重传功能啊
            const file = this.getFile(rawFile)
            const fileList = this.uploadFiles
            fileList.splice(fileList.indexOf(file), 1)
        },
        handleRemove (file) {
            const status = file.status
            const fileList = this.uploadFiles
            const index = fileList.indexOf(file)
            fileList.splice(index, 1)
            if (status === 'success') {
                this.$emit('input', this.uploadSuccessOriginalData)
            }
        },
        getFile (rawFile) {
            return this.uploadFiles.find(item => item.uid === rawFile.uid)
        },
        submit () {
            this.uploadFiles
                .filter(file => file.status === 'ready')
                .forEach(file => {
                    this.$refs['upload-inner'].upload(file.raw)
                })
        },
  	},

    beforeDestroy () {
        this.uploadFiles.forEach(file => {
            if (file.url && file.url.indexOf('blob:') === 0) {
                URL.revokeObjectURL(file.url)
            }
        })
    },

    render (h) {
        const uploadList = this.showFileList
            ? (
                <UploadList
                    disabled={this.disabled}
                    listType={this.listType}
                    files={this.uploadFiles}
                    on-remove={this.handleRemove}
                    handlePreview={this.onPreview}
                />
            )
            : null

        const uploadData = {
            props: {
                type: this.type,
                drag: this.drag,
                action: this.action,
                multiple: this.multiple,
                'with-credentials': this.withCredentials,
                headers: this.headers,
                name: this.name,
                data: this.data,
                accept: this.accept,
                fileList: this.uploadFiles,
                autoUpload: this.autoUpload,
                listType: this.listType,
                disabled: this.disabled,
                limit: this.limit,
                'on-exceed': this.onExceed,
                'on-start': this.handleStart,
                'on-progress': this.handleProgress,
                'on-success': this.handleSuccess,
                'on-error': this.handleError,
                'on-preview': this.onPreview,
                'http-request': this.httpRequest,
            },
            ref: 'upload-inner',
        }

        const trigger = this.$slots.trigger || this.$slots.default
        const uploadComponent = <upload {...uploadData}>{trigger}</upload>

        return (
            <div>
                { this.listType === 'picture-card' ? uploadList : ''}
                {
                    trigger
                        ? [uploadComponent, trigger,]
                        : uploadComponent
                }
                {this.$slots.tip}
                { this.listType !== 'picture-card' ? uploadList : ''}
            </div>
        )
    },
}
</script>
