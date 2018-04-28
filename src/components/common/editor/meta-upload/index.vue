<script>
import UploadList from './upload-list';
import Upload from './upload';
import IframeUpload from './iframe-upload';



function noop() {}

function identity(item){
    return item
}

export default {
    name: 'metaUpload',
    components: {
        UploadList,
        Upload,
        IframeUpload
    },
    provide: {
        uploader: this
    },

    props:{
        action:{
            type: String,
            required: true
        },
        headers:{
            type:Object,
            default(){
                return {};
            }
        },
        data:{
            type:Object,
            default(){
                return {};
            }
        },
        multiple:{
            type:Boolean,
            default:false,
        },
        name: {
            type:String,
            default:'file'
        },
        drag:{
            type:Boolean,
            default:false,
        },
        withCredentials:{
            type:Boolean,
            default:false,
        },
        showFileList: {
            type: Boolean,
            default: true
        },
        accept:{
            type:String,
        },
        beforeUpload:{
            type:Function,
        },
        onRemove:{
            type: Function,
            default:noop
        },
        onChange: {
            type: Function,
            default: noop
        },
        onPreview: {
            type: Function
        },
        onSuccess: {
            type: Function,
            default: noop
        },
        onProgress: {
            type: Function,
            default: noop
        },
        onError: {
            type: Function,
            default: noop
        },
        fileList: {
            type: Array,
            default() {
                return [];
            }
        },
        autoUpload: {
            type: Boolean,
            default: true
        },
        listType: {
            type: String,
            default: 'text'   // text,picture,picture-card
        },
        httpRequest:{
            type:Function,
        },
        disabled:{
            type:Boolean,
            default:false,
        },
        getPath:{
            type:Function,
            default:identity,
        },
        getName:{
            type:Function,
            default:identity,
        },
    },

    data() {
        return {
            uploadFiles: [],
            dragOver: false,
            draging: false,
            tempIndex: 1
        };
    },

    watch:{
        fileList:{
            immediate: true,
            handler(fileList) {
                // 上传组件功能是上传，但对于表单元素来说重要的是上传后后端返回的值
                // 比如文件保存的路径，文件id等信息
                // 可能返回的信息格式不同，可能只返回文件路径(每一项是一个纯字符串)
                // 可能包含名称和路径/id/名称 (每一项是一个对象)
                // 还有可能只有一个文件，因而不是数组结构，只是其中的一项

                // 底层都是数组结构，便于处理，单文件到多文件需要映射数组结构

                // 上传组件需要数组结构，每一项是个对象，包含路径，名称，id，状态，上传进度
                // 其中上层组件一定能提供的是路径，但是由于数据结构不固定，需要用户声明如何拿到路径 
                // getPath 方法
                // 类似的，需要getName方法确定展示名

                // 对于多个文件上传，面临上传先后顺序的问题
                // 上层组件只保留传完的
                // 因此本组件需要合并上层组件传完的和该组件未传完的
                this.uploadFiles = fileList.map(item => {
                    item.uid = item.uid || (Date.now() + this.tempIndex++);
                    item.status = 'success';
                    return item;
                });
            }
        }
    },

  methods: {
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      try {
        file.url = URL.createObjectURL(rawFile);
      } catch (err) {
        console.error(err);
        return;
      }

      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    },
    handleProgress(ev, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);

        if (file) {
        file.status = 'success';
        file.response = res;

        this.onSuccess(res, file, this.uploadFiles);
        this.onChange(file, this.uploadFiles);
        }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      const fileList = this.uploadFiles;

      file.status = 'fail';

      fileList.splice(fileList.indexOf(file), 1);

      this.onError(err, file, this.uploadFiles);
      this.onChange(file, this.uploadFiles);
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw);
      }
      this.abort(file);
      let fileList = this.uploadFiles;
      fileList.splice(fileList.indexOf(file), 1);
      this.onRemove(file, fileList);
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles;
      let target;
      fileList.every(item => {
        target = rawFile.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort(file) {
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles() {
      this.uploadFiles = [];
    },
    submit() {
      this.uploadFiles
        .filter(file => file.status === 'ready')
        .forEach(file => {
          this.$refs['upload-inner'].upload(file.raw);
        });
    },
  },

  render(h) {
    let uploadList;

    if (this.showFileList) {

      // 上传组件仅仅处理上传，进度条由上层组件处理
      if(typeof this.$scopedSlots.uploadList === 'function'){
        uploadList = this.$scopedSlots.uploadList({
            files:this.uploadFiles,
            remove:this.handleRemove,
        })
      }
      
    }

    const uploadData = {
      props: {
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.disabled,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };

    const trigger = this.$slots.trigger || this.$slots.default;
    const uploadComponent = (typeof FormData !== 'undefined' || this.$isServer)
        ? <upload {...uploadData}>{trigger}</upload>
        : <iframeUpload {...uploadData}>{trigger}</iframeUpload>;

    return (
      <div>
        { this.listType === 'picture-card' ? uploadList : ''}
        {
          this.$slots.trigger
          ? [uploadComponent, this.$slots.default]
          : uploadComponent
        }
        {this.$slots.tip}
        { this.listType !== 'picture-card' ? uploadList : ''}
      </div>
    );
  }
};
</script>
